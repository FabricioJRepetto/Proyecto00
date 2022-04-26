let stringifyTemp=(arg, set = false) => {

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
        temperaments: aux.slice(0, -2) })
    } 
    return newSet;
  }   
};

module.exports = {
  stringifyTemp,
}