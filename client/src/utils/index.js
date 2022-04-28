
const syntheticFilteringMachine = (state, config) => { 
    console.log(state);
    console.log(state[0].temperaments);
    const { name, source, order, asc, temps } = config;

    let array=[...state];

    // 1) Filtrado
      // a) fuente: 1 = all, 2 = API, 3 = DB;
    if (source !== 1) {
      if (source === 2) {
        state.filter(e => (typeof e.id === 'number'))
      } else {
        state.filter(e => (typeof e.id === 'string'))
      }
    };
      // b) temperamentos
    if (temps[0]) {  
      state.filter(e => e.temperaments.includes(temps[0]))
    }     

    // 2)Ordenado
      // a) orden por: Name, Height, Weight, Lifespan
      // b) ascendente o descendente: default true (ascendente)
    // if (order === "N") { // alfabético
      
    // } else { // numérico

    // };
}

export default syntheticFilteringMachine;