const { Dog, Temperament, dogtemp } = require("../db.js");
const { API_URL } = require("../../constants.js");
const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");
const { stringifyTemp, formatParser, setNewTemperaments } = require("../utils/utils.js")

//? GET
async function dogList(__, res, next) {
  try {
    let apiDogs = "";
    let dbDogs = "";
   
    //? get ALL
    apiDogs = await axios.get(API_URL)
    
    dbDogs = await Dog.findAll({
    include: [{
        model: Temperament,
        attributes: ["temperament"],
        through: { attributes: [] }
    }],
    });      

    let response = stringifyTemp(dbDogs, true).concat(formatParser(apiDogs.data));
    return res.json(response);

  } catch (err) {
    next(err);    
  }
}

//? by ID
async function dogID(req, res, next) { 
  try {
    let id = req.params.id;

    if (id.includes("-")) {
            
        if (id.length !== 36) return res.status(400).json({ error: 400, message: "Invalid ID format." });

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
            ({ id,              
                name,
                height,
                weight,
                life_span,
                temperaments,
                description,
                image
            } = petition);
            // Response
            const response = {id, name, height, weight, life_span, image, description: description.trim(), temperaments: stringifyTemp(petition)};
            return res.json(response);
        } else {
            return res.status(400).json({ error: 400, message: "No matches for the given ID." });
        }

    } else {
        const { data } = await axios.get(API_URL)        
        let match = [];
        data.forEach(e => {
            e.id === parseInt(id) && match.push(e)
        })
        match[0] 
        ? res.json(formatParser(match)[0])
        : res.status(400).send({ error: 400, message: "No matches for the given ID." });
    } 
    } catch (err) {
        next(err)
    }
}

//? Get All Names
async function dogNames (__, res, next) {
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

//? POST
async function addDog(req, res, next) {
    try {
        let { name, height, weight, life_span, description, image} = req.body;    
        let temps = req.body.temperaments.split(", ");
        let invalid = true;
        let code = 200;
        let response = {};

        //? Validación nombre único
        const apiNames = await axios.get(API_URL);
        const dbNames = await Dog.findAll();
        let aux = apiNames.data.concat(dbNames);
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
            description,
            image
            });   

            //? Creación de temperamentos
            let tempsToAdd = await setNewTemperaments(temps);
            //? Addición de temperamentos
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

//? EDIT / PUT
async function editDog (req, res, next) {
    let { id, name, height, weight, life_span, image, description } = req.body
    let temps = req.body.temperaments.split(", ");

    try {
        const targetDog = await Dog.findByPk(id);
        await dogtemp.destroy({
            where: { dogId: id }
        });
        await targetDog.update({ name, height, weight, life_span, image, description });
        const tempsToAdd = await setNewTemperaments(temps)
        await targetDog.addTemperaments(tempsToAdd)
        res.json(targetDog)

    } catch (error) {
        next(error);
    }
}

//? DELETE
async function deleteDog (req, res, next) {
    let id = req.body.id;    
    try {
        const request = await Dog.destroy({
            where: { id }
        })
        res.json(request)
    } catch (error) {
        next(error)
    }
};

module.exports = {
  dogList,
  addDog,
  dogID,
  dogNames,
  deleteDog,
  editDog
};
