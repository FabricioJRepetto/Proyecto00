require("dotenv").config();
const { default: axios } = require("axios");
const { API_URL } = require("../../constants.js");
const { DB_PASSWORD } = process.env

//? - API TESTS -
//! <<< ⛔ <<<
async function devExp(req, res, next) {
  try {
    if (req.body.password === DB_PASSWORD) {    
    // ------------------------------------------------ \\  

          let response = [];
          let aux = 100
          let name = ''
          const petition = await axios.get(API_URL);
          petition.data.forEach(e => {
              if (e.name.trim().length < aux) {
                  aux = e.name.trim().length
                  name = e.name
              }
          })
          res.json("coincidencias: "+name+' '+aux)

    // ------------------------------------------------ \\  
    } else {
      res.status(401).json({error: 401, message: "Incorrect password"})
    }
  } catch (err) {
    next(err);    
  }
}

module.exports = {
  devExp,
};
