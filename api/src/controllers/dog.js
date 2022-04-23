const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");
const { API_URL, API_NAME_URL } = require("../../constants.js");
const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");

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

  if (id.includes("-")) {
    Dog.findByPk(id)
      .then(r => {
        if (r !== null) {
          return res.send(r);
        } else {
          return res.status(400).json({ error: 400, message: "ID inválida" });
        }
      })
      .catch(err => next(err));
  } else {
    //
    //? por qué no funciona con .filter o .find ???
    axios
      .get(API_URL)
      .then(r => {
        let response = [];
        r.data.forEach(e => {
          if (e.id === parseInt(id)) {
            response.push(e);
          }
        });
        if (response.length) {
          return res.json(response);
        } else {
          return res.status(400).send({ error: 400, message: "ID inválida" });
        }
      })
      .catch(err => next(err));
  }
}

//? POST
//: si ya existe que no se cree.
async function addDog(req, res, next) {
  let id = uuidv4();
  let dogBody = { ...req.body, id: id };
  let temps = req.body.temperament.split(", ");
  let arr = [];

  const perrito = await Dog.create(dogBody);   
   
  await temps.forEach(temp =>    
      Temperament.findOrCreate({
        where: { temperament: temp },       
        defaults: {
          id: uuidv4()
        },
      })
      .catch(err => next(err))
  ); 

 try {
   await perrito.addTemperaments(temps)
 } catch (error) {
   next(error)
 }
  res.json(perrito);
}

module.exports = {
  dogList,
  addDog,
  dogID,
};
