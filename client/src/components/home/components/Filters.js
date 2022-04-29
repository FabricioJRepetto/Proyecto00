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
  //const [payload, setPayload] = useState([]);
  const [tempList, setTempList] = useState([]);
  //const dogs = useSelector(state => state.dogs.main);
  //const filtered = useSelector(state => state.dogs.filtered);
  const temperaments = useSelector(state => state.dogs.temps);
  const filters = useSelector(state => state.dogs.filters);
  const dispatch = useDispatch();
  //const { name, source, order, asc, temps } = filters;  
  
  useEffect(() => {
    
    // 1) Filtrado
      // a) fuente: 1 = all, 2 = API, 3 = DB;
    // if (source !== 1) {
    //   if (source === 2) {
    //     filterSource('number')
    //   } else {
    //     filterSource('string')        
    //   }
    // };
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

    return () => {   }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])
  
  const nameInput = async ()=>{
    let name = document.getElementById('input_name').value;
    const { data } = await axios.get(`${API_DOGS}?name=${name}`)
    dispatch(searchByName(data))
  }
  
  let eventSource = null;
  const eventSourceCatcher =(e)=> {    
    eventSource = e.key === "Unidentified" ? 'list' : 'input'
  }
  const eventValueCatcher =(e)=> {
    if (eventSource === 'list') { 
      if (!tempList.includes(e.target.value) && tempList.length < 3) {
        setTempList([...tempList, e.target.value]);
        document.getElementById('input_temps').value = '';
        //: action
      }
    }
  }
  const deleteCardHandler = async (e)=> {
     setTempList([...tempList].filter(
      t=> t !== e.target.innerText
    ))    
  }

  return(
    <div>
      <h2>Dog Filters</h2>
      <input type='text' id='input_name' placeholder='Name'></input>
      <button onClick={()=>(nameInput())}>🔍</button>
      <hr/>
      <p><b>Get results from:</b></p>
      <label>
        < input type='radio' name='franco' value='all' 
          defaultChecked onClick={()=>dispatch(filterSource('all'))}/>
          All dogs 
          </label>
      <label>
        < input type='radio' name='franco' value='number' 
        onClick={()=>(dispatch(filterSource('number')))}/>
        Originals 
        </label>
      <label>
        < input type='radio' name='franco' value='string' 
        onClick={()=>(dispatch(filterSource('string')))}/>
        My Collection 
        </label>      
      <br/>
      <hr/>
      <p><b>Temperaments:</b></p>
        <div>
          {tempList?.map(t=>
            <div key={t+"-f"}            
                onClick={deleteCardHandler}>
                <label><p>{t}</p> x</label>
            </div>
          )}
        </div>
        <input id='input_temps' list="list_temps" 
        onKeyDown={eventSourceCatcher} 
        onChange={eventValueCatcher} />
        <datalist id="list_temps" >
          {
            temperaments.map(e => (
              <option key={e} value={e} />
            ))
          }
        </datalist>
      <br/>
      <hr/>       
      <p><b>Order: asc/desc // weight/name</b></p>
      <br/>
      <input type="chekbox"/>
      <input type="reset" value=" Reset ❌"/>
      <br/>
      <hr/>      
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