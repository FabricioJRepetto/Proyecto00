import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';

const Form = () => {
    //const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [heightMin, setHeightMin] = useState('');
    const [heightMax, setHeightMax] = useState('');
    const [weightMin, setWeightMin] = useState('');
    const [weightMax, setWeightMax] = useState('');
    const [lifeMin, setLifeMin] = useState('');
    const [lifeMax, setLifeMax] = useState('');
    const [temps, setTemps] = useState([]);
    const dogs = useSelector(state => state.dogs.main);
    const temperaments = useSelector(state => state.dogs.temps);

//? temperaments
    let source = null;
    const eventSourceCatcher =(e)=> {
        source = e.key === "Unidentified" ? 'list' : 'input'
    };
    const eventValueCatcher =(e)=> {
        if (source === 'list') { //? maximo de temps seleccionables⬇
            if (!temps.includes(e.target.value) && temps.length < 3) {
                setTemps([...temps, e.target.value]);
                document.getElementById('form-temps').value = '';
            }
        }
    };
    const deleteCardHandler = (e)=> {        
        setTemps([...temps].filter(
            t=> t !== e.target.innerText
        ))
    };

//? Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        let height = `${heightMin} - ${heightMax}`,
        weight = `${weightMin} - ${weightMax}`,
        life_span = `${lifeMin} - ${lifeMax}`,
        temperaments = temps.join(', '),
        data = {name, height, weight, life_span, temperaments};

        console.log(data);

        //let submit = await axios.post();

        alert('perro creado')
    };

  return(
        <div>
            <h2>Create a new dog!</h2>
            <form action="">
                    
                <div>
                    <label htmlFor='form-name'>Name: </label>
                    <input type="text" id='form-name' name='form-name' 
                    value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="form-temps">Temperaments: </label>
                    <input id='form-temps' name='form-temps' list='form-list-temps'
                    onKeyDown={eventSourceCatcher} 
                    onChange={eventValueCatcher} />
                    <datalist id='form-list-temps'>
                        {temperaments.map(t => (
                            <option key={`form-${t}`} value={t} />
                        ))}
                    </datalist>
                    <div className="form-temps-box">
                        {temps?.map(t=>
                            <div key={t+"-form"}            
                                onClick={deleteCardHandler}>
                                <div><span>{t}</span>   x</div>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <p>Height: </p>
                    <label htmlFor="heightMin">min: </label>
                    <input type="number" id='heightMin' value={heightMin} onChange={(e) => setHeightMin(e.target.value)}/>
                    <label htmlFor="heightMax">max: </label>
                    <input type="number" id='heightMax' value={heightMax} onChange={(e) => setHeightMax(e.target.value)}/>
                </div>

                <div>
                    <p>Weight: </p>
                    <label htmlFor="weightMin">min: </label>
                    <input type="number" id='weightMin' value={weightMin} onChange={(e) => setWeightMin(e.target.value)}/>
                    <label htmlFor="weightMax">max: </label>
                    <input type="number" id='weightMax' value={weightMax} onChange={(e) => setWeightMax(e.target.value)}/>
                </div>

                <div>
                    <p>Lifespan: </p>
                    <label htmlFor="lifeMin">min: </label>
                    <input type="number" id='lifeMin' value={lifeMin} onChange={(e) => setLifeMin(e.target.value)}/>
                    <label htmlFor="lifeMax">max: </label>
                    <input type="number" id='lifeMax' value={lifeMax} onChange={(e) => setLifeMax(e.target.value)}/>
                </div>
                   
                   <input type="button" value='Create!' onClick={handleSubmit}/>
            </form>
        </div>

  );
};

export default Form;


let twitter = 'https://mobile.twitter.com/i/flow/signup';
let twitch = 'https://www.twitch.tv';
let Google = 'https://accounts.google.com/info/sessionexpired?continue=https%3A%2F%2Fwww.google.com%2Fsearch%3Fclient%3Dopera-gx%26q%3Dgoogle%26sourceid%3Dopera%26ie%3DUTF-8%26oe%3DUTF-8&hl=es&dsh=S-1425723599%3A1651466382608226&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp';
let Dofus = 'https://www.dofus.com/es/mmorpg/jugar';