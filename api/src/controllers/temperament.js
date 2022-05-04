const { Temperament } = require("../db");
const { default: axios } = require("axios");
const { API_URL } = require("../../constants.js");

async function temperamentList(req, res, next) {
  try {
    let response = [];
    const apiTemps = await axios.get(API_URL);  
    apiTemps.data.forEach(e => {
      if (e.temperament) { // Hay perros sin temperamentos
        e.temperament.split(", ").forEach(e => {
          if (response.includes(e) === false) response.push(e);
        });
      }
    });  
    const dbTemps = await Temperament.findAll();
    dbTemps.forEach(e => {
      response.includes(e.dataValues.temperament) || response.push(e.dataValues.temperament);
    });
    
    res.json(response);

  } catch (err) {
    next(err);    
  }
}

module.exports = {
  temperamentList,
};
