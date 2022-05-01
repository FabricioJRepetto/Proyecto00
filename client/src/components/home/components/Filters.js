import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  updateFilters,
  searchByName,
  filterSource,
  filterTemperament,
  setAsc,
  orderBy,
  reloadFiltered,
} from "../../../slice-reducer/dogsSlice";
import './Filters.css'

const Filters = () => {
  const [name, setName] = useState('');
  const [tempList, setTempList] = useState([]);
  const [order, setOrder] = useState('name');
  const asc = useSelector(state => state.dogs.asc);
  const temperaments = useSelector(state => state.dogs.temps);
  const filters = useSelector(state => state.dogs.filters);
  const dispatch = useDispatch();
  
  //? -------------- Filtrado ENCADENADO -------------- //
  useEffect(() => {
        const { source, order } = filters;
        let inputName = document.getElementById('input_name').value
        //1) Filtrado
            //a) fuente
        dispatch(filterSource(source))
            //b) nombre        
        inputName && dispatch(searchByName(inputName))
            //c) temperamentos
            //? si hago en for en el reducer no funciona como debería, solo da resultados del ultimo temperamento enviado.
        tempList.forEach(t => {
            dispatch(filterTemperament(t))
        })
        //2)Ordenado
        dispatch(orderBy(order))
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, name])

  //? -------------- Manejo por NOMBRE -------------- //
  const nameInput = (e)=>{      
      let inputName = document.getElementById('input_name').value.toLowerCase();
      inputName ? setName(inputName) : setName('')
  }
  
  //? -------------- Manejo TEMPERAMENTOS  -------------- //
  let eventSource = null;
  const eventSourceCatcher =(e)=> {    
    eventSource = e.key === "Unidentified" ? 'list' : 'input'
  }
  const eventValueCatcher = (e)=> {
    if (eventSource === 'list') { //? maximo de temps seleccionables⬇
      if (!tempList.includes(e.target.value) && tempList.length < 3) {
        setTempList([...tempList, e.target.value]);
        document.getElementById('input_temps').value = '';
      }
    }
  }
  const deleteCardHandler = (e)=> {
    dispatch(reloadFiltered())
      setTempList([...tempList].filter(
      t=> t !== e.target.innerText
    ))
  }  
  useEffect(() => {    
      tempList.length ? dispatch(updateFilters({ temp: tempList }))
      : dispatch(updateFilters({ temp: false }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempList])
  
  //? -------------- Manejo ORDEN -------------- //
  useEffect(() => {
      asc ? (document.getElementById('ascButton').innerText = '⬆Ascendent')
      : (document.getElementById('ascButton').innerText = '⬇Descendent')      
  }, [asc])
  const orderButtonHandler =(arg)=> {
    setOrder(arg)
    dispatch(updateFilters({order: arg}))
  };  
  const ascButtonHandler=(e)=> {    
    dispatch(setAsc())    
    dispatch(orderBy(order))
  };

//? -------------- RESET -------------- //
  const resetButton =()=> {
    dispatch(reloadFiltered())
    dispatch(updateFilters({source: 'all', order: 'name'}))
    setName('')
    setTempList([])
  }  

//? -------------- RENDER -------------- //
    //* Solución al '1 state behind'
        //? 1) onChange llama una funcion para setear el state. 
        //? 2) el value del input tiene que tener el nombre del state. 
        //? 3) inicializar el state con un "" en este caso.
  return(
        <div className="filtros">
            <h2>Dog Filters</h2>
            <form>
                <input type='text' id='input_name'
                    placeholder='Name' value={name}
                    onChange={nameInput}></input>
                <button type="button" onClick={(e)=>(nameInput(e))} value='Search'>🔍</button>

                    
                <hr/>
                <p><b>Get results from:</b></p>
                <div>
                    <label>
                        < input type='radio' name='source' value='all' 
                        defaultChecked 
                        onClick={()=>dispatch(updateFilters({source: 'all'}))}/>
                        All dogs 
                        </label>
                </div>
                <label>
                    < input type='radio' name='source' value='number'       
                    onClick={()=>(dispatch(updateFilters({source: 'number'})))}/>
                    Originals 
                    </label>
                <label>
                    < input type='radio' name='source' value='string'         
                    onClick={()=>(dispatch(updateFilters({source: 'string'})))}/>
                    My Collection 
                    </label>  

                <br/>
                <hr/>
                <p><b>Temperaments:</b></p>
                    <div>
                    {tempList?.map(t=>
                        <div key={t+"-f"}            
                            onClick={deleteCardHandler}>
                            <div><span>{t}</span>   x</div>
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
                <div>
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
                </div>
                    
                <div>
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
                </div>

                <br/>
                <hr/>
                <button type="button" id='ascButton'
                    value='⬆Ascendent'
                    onClick={ascButtonHandler}>
                        ⬆Ascendent
                </button>

                <input type="reset" value="Reset ❌"
                onClick={resetButton}/>
                <br/>
                <hr/>
            </form>
        </div>

  );
};

export default Filters;