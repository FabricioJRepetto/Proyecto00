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
  pageExact
} from "../../../slice-reducer/dogsSlice";
import { ReactComponent as IconSearch } from '../../../assets/search-icon.svg'
import { ReactComponent as IconClose } from '../../../assets/close-icon.svg'
import { ReactComponent as IconMenu } from '../../../assets/menu.svg'
import './Filters.css'

const Filters = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [tempList, setTempList] = useState([ ]);
    const [order, setOrder] = useState('name');
    const [filterOpen, setFilterOpen] = useState(false)
    const asc = useSelector(state => state.dogs.asc);
    const temperaments = useSelector(state => state.dogs.temps);
    const filters = useSelector(state => state.dogs.filters);
    const firstLoad = useSelector(state => state.dogs.firstLoad);
    let savedName = JSON.parse(localStorage.getItem('filter-name-input'));
    let savedTemps = JSON.parse(localStorage.getItem('filter-temps-input'));

  //? -------------- Keeping filter options after unmount -------------- //
    useEffect(() => {
        let {source, order} = filters;
        if (!firstLoad) {
            setName(savedName)
            setTempList(savedTemps)
            document.getElementById(`radio-${source}`).checked = true;
            document.getElementById(`radio-${order}`).checked = true;
        }        
        // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [])

  //? -------------- Chained filter -------------- //
  useEffect(() => {
        const { source, order } = filters;
        let inputName = document.getElementById('input_name').value
        localStorage.setItem('filter-name-input', JSON.stringify(inputName))

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

  //? -------------- Name handler -------------- //
  const nameInput = (e)=>{      
        dispatch(pageExact(1))
        let value = e.target.value.toLowerCase();
        value ? setName(value) : setName('');
  }
  
  //? -------------- Temperament handler  -------------- //
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
        tempList.length 
        ? dispatch(updateFilters({ temp: tempList }))
        : dispatch(updateFilters({ temp: false }))

        localStorage.setItem('filter-temps-input', JSON.stringify(tempList));
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempList])
  
  //? -------------- Order handler -------------- //
  useEffect(() => {
      asc ? (document.getElementById('ascButton').innerText = '⬆ Asc.')
      : (document.getElementById('ascButton').innerText = '⬇ Desc.')      
  }, [asc])
  const orderButtonHandler =(arg)=> {
    setOrder(arg)
    dispatch(updateFilters({order: arg}))
  };  
  const ascButtonHandler=(e)=> {    
    dispatch(setAsc())    
    dispatch(orderBy(order))
  };

//? -------------- Reset -------------- //
  const resetButton =()=> {
    dispatch(reloadFiltered())
    dispatch(updateFilters({source: 'all', order: 'name'}))
    setName('')
    setTempList([])
    dispatch(pageExact(1))
  }  

  const menuButtonHandler = () => {
        
      filterOpen ? setFilterOpen(false) : setFilterOpen(true);
  }; 

//? -------------- RENDER -------------- //   
  return(
    <form className={`filters ${filterOpen && 'open'}`}>

        <div className='border-menu-button'>
            <button type='button' 
                className='filters-switch' 
                onClick={menuButtonHandler}>
                <IconMenu className="button-menu"/>
            </button>
        </div>

        <div className="filter-container">

            <div>
            <h2>Filters</h2>
                <div className='filter-box'>
                    <input type='text' id='input_name'
                        value={name} onChange={nameInput} placeholder=' name' className='input'></input>
                        <IconSearch color='#fffdde' className="search-button" onClick={(e)=>(nameInput(e))} />                        
                </div>

                <div className='filter-box'>
                <h3><b>Temperaments:</b></h3>
                    <input id='input_temps' list="list_temps" className='input input-plus'
                    onKeyDown={eventSourceCatcher} 
                    onChange={eventValueCatcher} />
                    <datalist id="list_temps" >
                        {temperaments.map(t => (
                            <option key={`filter-${t}`} value={t} />
                        ))}
                    </datalist>
                    <div className="filter-temps-box">
                    {tempList?.map(t=>
                        <div key={t+"-filter"}
                            className="temp-card"
                            onClick={deleteCardHandler}>
                            <span>{t}</span>
                            <IconClose className="close-button" /> 
                        </div>
                    )}
                    </div>
                </div>
            </div>

            <div>
                <div className='filter-box'>
                    <h3><b>Get results from:</b></h3>
                    <div>
                        <label>
                            < input id='radio-all' type='radio' name='source' value='all' 
                            defaultChecked 
                            onClick={()=>dispatch(updateFilters({source: 'all'}))}/>
                            All dogs 
                            </label>
                    </div>
                    <label>
                        < input id='radio-number' type='radio' name='source' value='number'       
                        onClick={()=>(dispatch(updateFilters({source: 'number'})))}/>
                        Originals 
                        </label>
                    <label>
                        < input id='radio-string' type='radio' name='source' value='string'         
                        onClick={()=>(dispatch(updateFilters({source: 'string'})))}/>
                        Custom 
                        </label>
                </div>
                        
                <div className='filter-box'>
                    <h3><b>Order: </b></h3>
                    <div>
                        <label>
                            < input id='radio-name' type='radio' name='order_by' defaultChecked 
                            onClick={()=>orderButtonHandler('name')}/>
                            Name
                            </label>
                        <label>
                            < input id='radio-life_span' type='radio' name='order_by' 
                            onClick={()=>orderButtonHandler('life_span')}/>
                            Lifespan
                            </label>
                    </div>                    
                    <div>
                        <label>
                            < input id='radio-height' type='radio' name='order_by' 
                            onClick={()=>orderButtonHandler('height')}/>
                            Height
                            </label>
                        <label>
                            < input id='radio-weight' type='radio' name='order_by' 
                            onClick={()=>orderButtonHandler('weight')}/>
                            Weight
                        </label>
                    </div>
                </div>
                

                <div className='bottom-box'>
                    <button type="button" id='ascButton'
                        value='⬆ Asc.' className='button-asc'
                        onClick={ascButtonHandler}>
                            ⬆ Asc.
                    </button>

                    <input type="reset" value="Reset"
                    onClick={resetButton}
                    className='button-reset'/>
                </div>
            </div>
          </div>
        </form>
  );
};

export default Filters;