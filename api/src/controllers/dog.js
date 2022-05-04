const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db.js");
const { API_URL, API_NAME_URL } = require("../../constants.js");
const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");
const { stringifyTemp, formatParser } = require("../../utils.js")

//? GET
async function dogList(req, res, next) {
  try {
    let apiDogs = "";
    let dbDogs = "";
    //? QUERY by NAME
    if (req.query.name) { 
      apiDogs = await axios.get(`${API_NAME_URL}${req.query.name}`)     
     
      dbDogs = await Dog.findAll({
        where: {
          name: {
            [Op.iLike]: `%${req.query.name}%`,
          },
        },
        include: [{
          model: Temperament,
          attributes: ["temperament"],
          through: { attributes: [] }
        }],
      });
      
    } else {  
      //? get ALL
      apiDogs = await axios.get(API_URL)
      
      dbDogs = await Dog.findAll({
        include: [{
          model: Temperament,
          attributes: ["temperament"],
          through: { attributes: [] }
        }],
      });      
    }
    //? Respuesta a la petición
    let response = stringifyTemp(dbDogs, true).concat(formatParser(apiDogs.data));
    if (response[0]) {
      return res.json(response);
    }
      return res.json({ error: 400, message: "No hay ningún resultado para el nombre indicado." });

  } catch (err) {
    next(err);    
  }
}

//? by ID
async function dogID(req, res, next) { 
  try {
    let id = req.params.id;    

    if (id.includes("-")) {
      const petition = await Dog.findOne({
        where: { id },
        include: [{
          model: Temperament,
          attributes: ["temperament"],
          through: { attributes: [] }
        }],
    })       
    if (petition !== null) {
    // destructuring
        ({
          id,              
          name,
          height,
          weight,
          life_span,
          temperaments              
      } = petition);
      // Response
      const response = {id, name, height, weight, life_span, temperaments: stringifyTemp(petition)};
      return res.json(response);
    } else {
      return res.status(400).json({ error: 400, message: "No matches for the given ID." });
    }

    } else {
      // Petición y filtrado
      const petition = await axios.get(API_URL)        
      let match = [];
      
      petition.data.forEach(e => {
        // por qué no funciona con .filter o .find ???
        if (e.id === parseInt(id)) {
          match.push(e)
        };          
      });
      if (match[0]) {
        return res.json(formatParser(match)[0]);

      } else {
        return res.status(400).send({ error: 400, message: "No matches for the given ID." });
      }
    }
  } catch (err) {
    next(err)
  }
}

//? POST
async function addDog(req, res, next) {
try {    
    //: falta la IMAGEN?
    let { name, height, weight, life_span} = req.body;    
    let temps = req.body.temperaments.split(", ");  
    let auxArray = [];
    let tempsToAdd = [];
    let invalid = true;
    let code = 200;
    let response = {};

    //? Validación nombre único

    const apiNames = await axios.get(API_URL);
    const dbNames = await Dog.findAll();
    let aux = apiNames.data.concat(dbNames);
    console.log(name);
    aux.forEach(dog => {
        if (dog.name.toLowerCase() === name.toLowerCase()) {
            invalid = false;         
            code = 400;
            response = {error: 400, message: 'The breed name already exists.'}
        }
    });    

    //? Creacion del nuevo Perro    
    if (invalid) {
        const newDog = await Dog.create({
          id: uuidv4(),
          name,
          height,
          weight,
          life_span,
        });   
     
        //? creo/busco los temperamentos
        // los pusheo en un array
        await temps.forEach(temp => {        
            auxArray.push(        
            Temperament.findOrCreate({
                where: { temperament: temp },       
                defaults: {
                id: uuidv4()
                },
            })
            // .then(r => arr.push(r.id)) // rompia la relación         
            );
        });
        // uso el array en un promise all, para obtener los id correctos de cada temperamento.
        const promiseAll = await Promise.all(auxArray);
        // Tomo los datos necesarios y los pusheo a un array para asignarlos al perro mediante la tabla intermedia
        promiseAll.forEach(t => {
        tempsToAdd.push(t[0].dataValues.id)
        })
        await newDog.addTemperaments(tempsToAdd)
    
        //? Respuesta a la petición
        response = await Dog.findOne({
        where: { name },
        include: [{
            model: Temperament,
            attributes: ["temperament"],
            through: { attributes: [] }
        }],
        })    
    }

    res.status(code).json(response)

    } catch (err) {
    next(err)
    } 
}

//? Get Names
async function dogNames (req, res, next) {
    try {
        let response = [];
        const apiNames = await axios.get(API_URL);
        const dbNames = await Dog.findAll();
    
        apiNames.data.forEach(dog => {
            (response.includes(dog.name)) || response.push(dog.name)
        });
        dbNames.forEach(dog => {
            (response.includes(dog.name)) || response.push(dog.name)
        });
        res.json(response)
    } catch (err) {
        next(err)
    }    
}

module.exports = {
  dogList,
  addDog,
  dogID,
  dogNames
};
