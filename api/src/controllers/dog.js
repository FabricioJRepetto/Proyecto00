const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");
const { API_URL, API_NAME_URL } = require("../../constants.js");
const { default: axios } = require("axios");
const { v4: uuidv4, parse: uuidParse, stringify: uuidStringify } = require("uuid");

//? GET
//: Combino API con DB, quizas tenga que cambiar esto.
function dogList(req, res, next) {
  let apiDogs;
  let dbDogs;

  if (req.query.name) {
    // by QUERY
    apiDogs = axios.get(`${API_NAME_URL}${req.query.name}`).then(r => {
      return r.data;
    });
    dbDogs = Dog.findAll({
      where: {
        name: {
          [Op.like]: `%${req.query.name}%`,
        },
      },
    });
  } else {
    // ALL
    apiDogs = axios.get(API_URL).then(r => {
      return r.data;
    });
    dbDogs = Dog.findAll();
  }
  // response
  Promise.all([apiDogs, dbDogs])
    .then(r => {
      let [apiDogs, dbDogs] = r;
      return res.send(dbDogs.concat(apiDogs));
    })
    .catch(err => {
      next(err);
    });
}

function dogID(req, res, next) {
  // by ID
  let id = req.params.id;

  if (req.params.id.includes("-")) {
    Dog.findOne({
      where: {
        id: {
          [Op.like]: id, // ! NO ANDA LOCO
        },
      },
    })
      .then(r => {
        return res.send(r);
      })
      .catch(err => next(err));
  } else {
    axios
      .get(API_URL)
      .then(r => {
        let newArr = [];
        r.data.forEach(e => {
          if (e.id === parseInt(req.params.id)) {
            newArr.push(e);
          }
        });
        return res.json(newArr);
      })
      .catch(err => next(err));
  }
}

//? POST
function addDog(req, res, next) {
  let id = uuidv4();
  let dogBody = { ...req.body, id: id };
  // tempCreator(req.body.temperament);
  Dog.create(dogBody)
    .then(r => {
      res.send(r);
    })
    .catch(err => next(err));
}

//: Crear temperamentos nuevos en la DB
/*function tempCreator(arg) {
  let temps = arg.split(", ");

  for (let i = 0; i < temps.length; i++) {
    Temperament.findAll()
      .then(t => {
        t.map(e => (e = { temperament: e.temperament }));
      })
      .then(t => {
        if (t.includes(temps[i]) === false) {
          let id = uuidv4();
          Temperament.create({ id: id, temperament: temps[i] }).catch(err => console.error(err));
        }
      });
  }
}*/

//

module.exports = {
  dogList,
  addDog,
  dogID,
};
