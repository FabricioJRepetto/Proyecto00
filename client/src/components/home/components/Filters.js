import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API_DOGS } from "../../../constants";
import { loadDogs,
  loadFiltered,
  updateFilters,
  filterSource,
  searchByName,} from "../../../slice-reducer/dogsSlice";


const Filters = () => {
  const [payload, setPayload] = useState([]);
  const [tempList, setTempList] = useState([]);
  const dogs = useSelector(state => state.dogs.main);
  const filtered = useSelector(state => state.dogs.filtered);
  const temperaments = useSelector(state => state.dogs.temps);
  const filters = useSelector(state => state.dogs.filters);
  const dispatch = useDispatch();
  const { name, source, order, asc, temps } = filters;

  useEffect(() => {
      setTempList((tempList)=> [...tempList, temperaments]) 
      console.log(temperaments);
      console.log(tempList);
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, [])
  
  useEffect(() => {
    
    // 1) Filtrado
      // a) fuente: 1 = all, 2 = API, 3 = DB;
    if (source !== 1) {
      if (source === 2) {
        filterSource('number')
      } else {
        filterSource('string')        
      }
    };
      // b) temperamentos
    // if (temps[0]) {  
    //   state.filter(e => e.temperaments.includes(temps[0]))
    // }     

    // 2)Ordenado
      // a) orden por: Name, Height, Weight, Lifespan
      // b) ascendente o descendente: default true (ascendente)
    // if (order === "N") { // alfabético
      
    // } else { // numérico

    // };

    return () => {      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])
  
  const nameInput = async ()=>{
    let name = document.getElementById('input_name').value;
    const { data } = await axios.get(`${API_DOGS}?name=${name}`)
    dispatch(searchByName(data))
  }


  return(
    <div>
      <h2>Dog Filters</h2>
      <input type='text' id='input_name' placeholder='Name'></input>
      <button onClick={()=>(nameInput())}>🔍</button>
      <br/>
      <p>Origen de resultados: </p>
      <button onClick={()=>(dispatch(filterSource('all')))}>Everything</button>
      <button onClick={()=>(dispatch(filterSource('number')))}>API</button>
      <button onClick={()=>(dispatch(filterSource('string')))}>database</button>
      <br/>
      <p>Temperamentos: </p>
      <datalist id='input_temps'>
        {tempList.map(e => (
          <option value={e} />
        ))}
        </datalist>
      <br/>
      <br/>
      <p><b>Order: asc/desc // weight/name</b></p>
      <input type="reset" value="🔄"/>
      <br/>
    </div>

  );
};

export default Filters;

/*
: filters state :
{name: null, source: 1, order: 'N', asc: true, temps: []}

? [0] nombre: null, string.
? [1] { source: 1, 2, 3 }
     1: All, 2: Api, 3: Database
? [2] temps: [", ", ", "]
? [3] asc: true, false.
? [4] { order: N, L, H, W }
     Name, Lifespan, Height, Weight

*/