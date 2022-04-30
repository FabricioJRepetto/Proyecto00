import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API_DOGS } from "../../../constants";
import { 
  loadDogs,
  loadFiltered,
  updateFilters,
  searchByName,
  filterSource,
  filterTemperament,
  setAsc,
  orderBy,
  reload,
} from "../../../slice-reducer/dogsSlice";


const Filters = () => {
  //const [payload, setPayload] = useState([]);
  const [name, setName] = useState(false);
  const [source, setSource] = useState(1);
  const [tempList, setTempList] = useState([]);
  const [order, setOrder] = useState('name');
  //const dogs = useSelector(state => state.dogs.main);
  //const filtered = useSelector(state => state.dogs.filtered);
  const asc = useSelector(state => state.dogs.asc);
  const temperaments = useSelector(state => state.dogs.temps);
  const filters = useSelector(state => state.dogs.filters);
  const dispatch = useDispatch();
  //const { name, source, order, asc, temps } = filters;  
  
  //? -------------- Filtrado ENCADENADO -------------- //
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


  //? -------------- Manejo por NOMBRE -------------- //
  const nameInput = (e)=>{
    if (e.code === 'Enter' || e.type === 'click') {
      let inputName = document.getElementById('input_name').value.toLowerCase();
      if (inputName) {
        setName(inputName)
      } else {
        setName(false)
      }
      //! DISPATCH
      dispatch(searchByName(inputName));
    }
  }
  
  //? -------------- Manejo TEMPERAMENTOS  -------------- //
  let eventSource = null;
  const eventSourceCatcher =(e)=> {    
    eventSource = e.key === "Unidentified" ? 'list' : 'input'
  }
  const eventValueCatcher = async (e)=> {
    if (eventSource === 'list') { 
      if (!tempList.includes(e.target.value) && tempList.length < 3) {
        setTempList([...tempList, e.target.value]);  
        //: action mandar un dispatch por cada elemento de tempList
        //: dispatch(filterTemperament(tempList))
        document.getElementById('input_temps').value = '';
      }
    }
  }
  const deleteCardHandler = (e)=> {    
      setTempList([...tempList].filter(
      t=> t !== e.target.innerText
    ))    
  }
  useEffect(() => {
    let array = [...tempList]
    //! DISPATCH
    array.forEach(t => {
      dispatch(filterTemperament(t))
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempList])
  
  //? -------------- Manejo ORDEN -------------- //
  useEffect(() => {
      asc ? (document.getElementById('ascButton').innerText = '⬆Ascendent')
      : (document.getElementById('ascButton').innerText = '⬇Descendent')      
  }, [asc])
  const orderButtonHandler =(arg)=> {
    setOrder(arg)
    dispatch(orderBy(arg))
  };  
  const ascButtonHandler=(e)=> {    
    dispatch(setAsc())    
    dispatch(orderBy(order))
  };

//? -------------- RESET -------------- //
  const resetButton =()=> {
    dispatch(reload())
  }

//? -------------- RENDER -------------- //
  return(
    <div>
      <h2>Dog Filters</h2>
      <input type='text' id='input_name' placeholder='Name'
        onKeyDown={(e)=>(nameInput(e))}></input>
      <button onClick={(e)=>(nameInput(e))}>🔍</button>
      <hr/>
      <p><b>Get results from:</b></p>
      <label>
        < input type='radio' name='source' value='all' 
          defaultChecked onClick={()=>dispatch(filterSource('all'))}/>
          All dogs 
          </label>
      <label>
        < input type='radio' name='source' value='number' 
        onClick={()=>(dispatch(filterSource('number')))}/>
        Originals 
        </label>
      <label>
        < input type='radio' name='source' value='string' 
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
      <p><b>Order: </b></p>
      <label>
        < input type='radio' name='order_by' defaultChecked 
        onClick={()=>orderButtonHandler('name')}/>
          Name 
          </label>
      <label>
        < input type='radio' name='order_by' 
        onClick={()=>orderButtonHandler('life_span')}/>
         Lifespan
        </label>

      <label>
        < input type='radio' name='order_by' 
        onClick={()=>orderButtonHandler('height')}/>
         Height
        </label>
      <label>
        < input type='radio' name='order_by' 
        onClick={()=>orderButtonHandler('weight')}/>
         Weight
        </label>
      <br/>
      <hr/>
      <button type="button" id='ascButton'
        value='⬆Ascendent'
        onClick={ascButtonHandler}        
        >⬆Ascendent</button>        
      <button onClick={resetButton}> Reset ❌</button>
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