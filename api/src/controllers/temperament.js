const { Temperament } = require("../db");
const { default: axios } = require("axios");
const { API_URL } = require("../../constants.js");

function temperamentList(req, res, next) {
  let apiTemps = axios
    .get(API_URL)
    .then(r => {
      let arr = [];
      r.data.forEach(e => {
        if (e.temperament) {
          e.temperament.split(", ").forEach(e => {
            if (arr.includes(e) === false) {
              arr.push(e);
            }
          });
        }
      });
      return arr;
    })
    .catch(err => next(err));

  let dbTemps = Temperament.findAll()
    .then(r => {
      let arr = [];
      r.forEach(e => {
        arr.push(e.temperament);
      });
      return arr;
    })
    .catch(err => next(err));

  Promise.all([apiTemps, dbTemps])
    .then(r => {
      let [apiTemps, dbTemps] = r;
      return res.send(apiTemps.concat(dbTemps));
    })
    .catch(err => {
      next(err);
    });
}

module.exports = {
  temperamentList,
};
