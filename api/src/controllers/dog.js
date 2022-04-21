const { Dog, Temperament } = require("../db");
const { API_URL } = require("../../constants.js");
const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");

//? GET
//: Combino API con DB, quizas tenga que cambiar esto.
function dogList(req, res, next) {
  let apiDogs = axios.get(API_URL);
  let dbDogs = Dog.findAll();

  Promise.all([apiDogs, dbDogs])
    .then(r => {
      let [apiDogs, dbDogs] = r;
      return res.send(dbDogs.concat(apiDogs.data));
    })
    .catch(err => {
      next(err);
    });
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
function queryFind(arg) {
  Dog.findAll()
    .then(t => {
      return t;
    })
    .catch(err => console.error(err));
}
function bodyFindOne(arg) {
  Dog.findOne();
}

module.exports = {
  dogList,
  addDog,
  queryFind,
  bodyFindOne,
};
