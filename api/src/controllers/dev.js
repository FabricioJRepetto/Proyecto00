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
          const petition = await axios.get(API_URL);
          petition.data.forEach(e => {
            if (!/^[0-9]/i.test(e.weight.metric)) {
              response.push(e)
            }
          });  
          res.json("coincidencias: "+response.length +" / "+ response[0].id + " " + response[1].id);

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
