const { Temperament } = require("../db");

function temperamentList(req, res, next) {
  Temperament.findAll()
    .then(t => {
      return res.send(t);
    })
    .catch(err => next(err));
}

module.exports = {
  temperamentList,
};
