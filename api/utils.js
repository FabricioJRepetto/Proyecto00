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
    let newSet = [];
    for (let i = 0; i < arg.length; i++) {
      // destructuring
      ({
        id,              
        name,
        height,
        weight,
        life_span             
        } = arg[i]);

      let aux = "";
      arg[i].temperaments.forEach(t => {        
        aux += t.temperament + ", ";
      });
      
      newSet.push({ 
        id,              
        name,
        height,
        weight,
        life_span, 
        temperaments: aux.slice(0, -2),
      })
    } 
    return newSet;
  }   
};

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
    //? hay 2 perros con datos corruptos, hago esto para que el ordenamiento en el front funcione como es debido.
    (/^[a-z]/i.test(weight)) && (weight = "15");

    aux.push({id, name, height, weight, life_span, temperaments, image})
  });
  return aux;
};

module.exports = {
  stringifyTemp,
  formatParser,
}