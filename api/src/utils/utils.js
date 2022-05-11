const { Temperament } = require('../db.js')
const { v4: uuidv4 } = require('uuid')

// Concateno los temperamentos recibidos de la Database a un solo string (individual o grupalmente)
const stringifyTemp=(arg, set = false) => {
  if (arg.length < 1) return [];

  if (!set) {
    let aux = "";
      arg.temperaments.forEach(e => {
        aux += e.temperament + ", ";        
    }); 
    return aux.slice(0, -2);    
  } 

  if (set) {    
    let newList = [];
    for (let i = 0; i < arg.length; i++) {
      // destructuring
      ({
        id,              
        name,
        height,
        weight,
        life_span,
        description,
        image
        } = arg[i]);

      let aux = "";
      arg[i].temperaments.forEach(t => {        
        aux += t.temperament + ", ";
      });
      
      newList.push({ 
        id,              
        name,
        height,
        weight,
        life_span,
        description,
        image,
        temperaments: aux.slice(0, -2),
      })
    } 
    return newList;
  }   
};

// Formateo los datos recibidos de la API
const formatParser=(arg) =>{
  let aux = [];

  arg.forEach(e => {    
    let {
            id,              
            name,
            height: {metric: height},
            weight: {metric: weight},            
            image: {url: image} = false,
            temperament: temperaments,
        } = e;    
    image || (image = `https://cdn2.thedogapi.com/images/${e.reference_image_id}`);
    life_span = e.life_span.slice(0, -6);
    // hay 2 perros con datos corruptos, hago esto para que el ordenamiento en el front funcione como es debido.
    (/^[a-z]/i.test(weight)) && (weight = "15");

    aux.push({id, name, height, weight, life_span, temperaments, image})
  });
  return aux;
};

// Crea temperamentos nuevos y devuelve sus IDs para asociarlos a un perro.
const setNewTemperaments = async (temps) => {
    //? recibe un array
    let auxArray = [];
    
    await temps.forEach(temp => {        
        auxArray.push(        
            Temperament.findOrCreate({
                where: { temperament: temp },       
                defaults: {
                id: uuidv4()
                },
            })
        );
    });
    // uso el array en un promise all, para obtener los id correctos de cada temperamento.
    const promiseAll = await Promise.all(auxArray);
    // Tomo los datos necesarios y los pusheo a un array para asignarlos al perro mediante la tabla intermedia
    let arrayIDs = [];
    promiseAll.forEach(t => {
    arrayIDs.push(t[0].dataValues.id)
    })
    //? retorno un array con los ID de los temps
    return arrayIDs;
};

module.exports = {
  stringifyTemp,
  formatParser,
  setNewTemperaments
}