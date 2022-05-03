import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { API_DOGS, API_TEMPS, API_POST } from "../../constants";
import { 
    loadDogs, 
    loadFiltered, 
    loadTemps, 
    orderBy, 
    loaded, } from "../../slice-reducer/dogsSlice";

const Form = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({});
    const [error, setError] = useState({});    
    const [name, setName] = useState('');
    const [tempList, setTemperaments] = useState([]);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [life_span, setLife_span] = useState('');

    //const dogs = useSelector(state => state.dogs.main);
    const firstLoad = useSelector(state => state.dogs.firstLoad);
    const temps = useSelector(state => state.dogs.temps);

    useEffect(() => {           
        const getData = async () => {
            let { data } = await axios.get(API_DOGS);
            let { data: temps } = await axios.get(API_TEMPS);
            temps.sort((a, b)=>
                a > b ? 1 : a < b ? -1 : 0)
            dispatch(loadDogs(data))
            dispatch(loadFiltered(data))
            dispatch(loadTemps(temps))
            dispatch(orderBy('name'))
            dispatch(loaded())
        };
        if (firstLoad) getData();        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])  

//? temperaments
    let source = null;
    const eventSourceCatcher =(e)=> {
        source = e.key === "Unidentified" ? 'list' : 'input'
    };
    const eventValueCatcher =(e)=> {
        if (source === 'list') { //? maximo de temps seleccionables⬇
            if (!tempList.includes(e.target.value) && tempList.length < 3) {
                setTemperaments([...tempList, e.target.value]);
                document.getElementById('form-temps').value = '';
            }
        }
    };
    const deleteCardHandler = (e)=> {        
        setTemperaments([...tempList].filter(
            t=> t !== e.target.innerText
        ))
    };

//? onChange
    const nameHandler = (e) => {
        let value = e.target.value;
        setName(value)
    };
    const heightHandler = (e) => {
        let value = e.target.value;
        setHeight(value)
    };
    const weightHandler = (e) => {
        let value = e.target.value;
        setWeight(value)
    };
    const lifeHandler = (e) => {
        let value = e.target.value;
        setLife_span(value)
    };

    useEffect(() => {
       setForm({
                name,
                height: height.replace('-', ' - '),
                weight: weight.replace('-', ' - '),
                life_span: life_span.replace('-', ' - '),
                temperaments: tempList.join(', ')
            })
    }, [tempList, name, height, weight, life_span])
    
        

//? inputValidator
    const validator = (e) => {
        let errors = {};
        let value = e.target.value;
        let input = e.target.name;

        const numValidator =(value)=> {
            if (!/^[\d-]*$/.test(value)) {
                errors = {...errors, [input]: 'Solo se aceptan numeros y -'}
            } else if (!/^\d{1,2}-\d{1,2}$/.test(value)){
                errors = {...errors, [input]: `Debe respetar la sintaxis '12-34'`}
            } else {
                let min = parseInt(value.split('-')[0])
                let max = parseInt(value.split('-')[1])
                if (min > max) errors = {...errors, [input]: 'La primer cifra no puede ser mayor a la segunda.'}
            }
        };

        if (input === 'name') {
            setName(value)
            if (value.trim().length < 3) {
                errors = {...errors, [input]: 'Nombre demasiado corto.'}
            } else if (!/^[a-z áéíóú]*$/gi.test(value)) {
                    errors = {...errors, [input]: 'Solo se aceptan letras y espacios.'}
            }
        }
        if (input === 'height') {
            setHeight(value)
            numValidator(value)
        }
        if (input === 'weight') {
            setWeight(value)
            numValidator(value)           
        }        
        if (input === 'life_span') {
            setLife_span(value)
            numValidator(value)           
        }

        if (tempList.length === 0) {
            errors = {...errors, temperaments: 'Selecciona o crea por lo menos un temperamento.'}
        }
        setError(errors);
    };

//? Submit
    const handleSubmit = async (e) => {
        if (Object.keys(error).length === 0) {
            
            e.preventDefault();
            //: height.replace('-', ' - ')
            
                       
            try {
                console.log(form);
                const req = await axios.post(API_POST, form);
                console.log(req);
            } catch (err) {
                alert(err)            
            }
        };
    };

  return(
        <div>
            <h2>Create a new dog!</h2>
            <form action="">
                    
                <div>
                    <label htmlFor='form-name'>Name: </label>
                    <input type="text" 
                    name='name' 
                    value={name}                     
                    onChange={validator}/>
                    {error.name && <p>{error.name}</p>}
                </div>

                <div>
                    <label htmlFor="form-temps">Temperaments: </label>
                    <input id='form-temps' 
                    name='temps' 
                    list='form-list-temps'
                    onKeyDown={eventSourceCatcher}
                    onClick={validator}
                    onChange={eventValueCatcher} />
                    <datalist id='form-list-temps'>
                        {temps.map(t => (
                            <option key={`form-${t}`} value={t} />
                        ))}
                    </datalist>
                    <div className="form-temps-box">
                        {tempList?.map(t=>
                            <div key={t+"-form"}            
                            onClick={deleteCardHandler}>
                                <div><span>{t}</span>   x</div>
                            </div>
                        )}
                    </div>
                    {error.temperaments && <p>{error.temperaments}</p>}
                </div>
                
                <div>                    
                    <label htmlFor="height">Height: </label>
                    <input type="text" 
                    required
                    name='height' 
                    value={height} 
                    onChange={validator} />
                    {error.height && <p>{error.height}</p>}
                </div>
                
                <div>                    
                    <label htmlFor="weight">Weight: </label>
                    <input type="text" 
                    required
                    name='weight' 
                    value={weight} 
                    onChange={validator} />
                    {error.weight && <p>{error.weight}</p>}
                </div>
                
                <div>                    
                    <label htmlFor="life_span">Lifespan: </label>
                    <input type="text" 
                    required
                    name='life_span' 
                    value={life_span} 
                    onChange={validator} />
                    {error.life_span && <p>{error.life_span}</p>}
                </div>
                   
                   <input type="button" value='Create!' onClick={handleSubmit}/>
            </form>
        </div>

  );
};

export default Form;


//  twitter  'https://mobile.twitter.com/i/flow/signup';
//  twitch  'https://www.twitch.tv';
//  Dofus  'https://www.dofus.com/es/mmorpg/jugar';
//  Google  'https://accounts.google.com/info/sessionexpired?continue=https%3A%2F%2Fwww.google.com%2Fsearch%3Fclient%3Dopera-gx%26q%3Dgoogle%26sourceid%3Dopera%26ie%3DUTF-8%26oe%3DUTF-8&hl=es&dsh=S-1425723599%3A1651466382608226&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp';