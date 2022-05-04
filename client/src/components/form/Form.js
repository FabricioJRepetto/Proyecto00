import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_POST } from "../../constants";
import useGetData from "../../utils";
import './Form.css'

const Form = () => {    
    const [form, setForm] = useState({});
    const [error, setError] = useState({}); 
    const [mount, setMount] = useState(false); 
    const [validating, setValidating] = useState('idle'); 
    const [name, setName] = useState('');
    const [tempList, setTemperaments] = useState([]);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [life_span, setLife_span] = useState('');
    const temps = useSelector(state => state.dogs.temps);
    const dogs = useSelector(state => state.dogs.main);

    useGetData()

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
        //validator(e)
    };
    const enterHandler =(e)=> {
        if (e.code === 'Enter') {
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

//? inputValidator
    const validator = (e) => {
        let errors = {...error};
        let forms = {...form};
        let value = e.target.value;
        let input = e.target.name;

        const numValidator =(value)=> {
            if (value) {
                if (!/^[\d-]*$/.test(value)) {
                    errors = {...errors, [input]: 'Solo se aceptan numeros y -'}
                } else if (!/^\d{1,2}-\d{1,2}$/.test(value)){
                    errors = {...errors, [input]: `Debe respetar la sintaxis '12-34'`}
                } else {
                    let min = parseInt(value.split('-')[0])
                    let max = parseInt(value.split('-')[1])
                    if (min > max) {
                    errors = {...errors, [input]: 'La primer cifra no puede ser mayor a la segunda.'}
                    } else {
                        delete errors[input]
                        forms = {...forms, [input]: value};
                    }
                }
            } else {
                    delete forms[input];
                    errors = {...errors, [input]: 'Campo requerido.'}
            }
        };

        if (input === 'name') {
            setValidating('idle')
            setName(value)
            if (value) {
                    if (value?.trim().length < 2) {
                           errors = {...errors, [input]: 'Nombre demasiado corto.'}
                    } else if (!/^[a-z ñáéíóú]*$/gi.test(value)) {
                            errors = {...errors, [input]: 'Solo se aceptan letras y espacios.'}
                    } else {
                        let flag = true;
                        dogs.forEach(n => {
                            if (n.name.toLowerCase() === value.toLowerCase()) {
                                setError({...errors, [input]: 'Nombre ya utilizado'});
                                setValidating('invalid');
                                return flag = false;
                            }
                        })
                        if (flag) {
                            delete errors.name
                            setValidating('valid');
                            forms = {...forms, [input]: name};
                        }
                    }
            } else {
                    delete forms[input];
                    errors = {...errors, [input]: 'Campo requerido.'}
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
        if (input === 'temps') {
            if (tempList.length < 1) {
                    delete forms.temperaments;
                    errors = {...errors, temperaments: 'Selecciona o crea por lo menos un temperamento.'}
            } else {
                    delete errors.temperaments
                    forms = {...forms, temperaments: tempList?.join(', ')}
            }
        }
        setError(errors); //!
        setForm(forms); //!
    };
    useEffect(() => {
        mount ? validator({target: {name: 'name', value: name}}) : setMount(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [name])
    useEffect(() => {
        mount ? validator({target: {name: 'temps'}}) : setMount(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [tempList])

//? Submit
    const handleSubmit = async (e) => {
        if (Object.values(form).length < 5) {
            let aux = {};
            name[0] &&  (aux = ({...error, name: 'Campo requerido.'}));
            (tempList.length < 1) &&  (aux = ({...aux, temperaments: 'Campo requerido.'}));
            !height &&  (aux = ({...aux, height: 'Campo requerido.'}));
            !weight &&  (aux = ({...aux, weight: 'Campo requerido.'}));
            !life_span &&  (aux = ({...aux, life_span: 'Campo requerido.'}));
            setError({...aux});
            return console.log('no lo envia è_é');
        }
        if (Object.keys(error).length === 0) {
            console.log('enviado e_e');
            e.preventDefault();
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
            <form autoComplete="off">                    
                <div>
                    <label htmlFor='form-name'>Name: </label>
                    <input type="text" 
                    name='name' 
                    value={name}
                    onChange={validator}/>
                    {validating !== 'idle'
                        ? validating === 'loading' ? <p>🕗</p>
                            : validating === 'invalid' ? <p>❗</p>
                                 : <p>✅</p>
                        : <p></p>
                    }
                    {error.name && <p className='error-message' >{error.name}</p>}
                </div>

                <div>
                    <label htmlFor="form-temps">Temperaments: </label>
                    <input id='form-temps' 
                    name='temps' 
                    list='form-list-temps'
                    onKeyDown={eventSourceCatcher}                    
                    onChange={eventValueCatcher} 
                    onKeyUp={enterHandler}/>
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
                    {error.temperaments && <p className='error-message'>{error.temperaments}</p>}
                </div>
                
                <div>                    
                    <label htmlFor="height">Height: </label>
                    <input type="text" 
                    name='height' 
                    value={height} 
                    onChange={validator} />
                    {error.height && <p className='error-message'>{error.height}</p>}
                </div>
                
                <div>                    
                    <label htmlFor="weight">Weight: </label>
                    <input type="text" 
                    name='weight' 
                    value={weight} 
                    onChange={validator} />
                    {error.weight && <p className='error-message'>{error.weight}</p>}
                </div>
                
                <div>                    
                    <label htmlFor="life_span">Lifespan: </label>
                    <input type="text"
                    name='life_span' 
                    value={life_span} 
                    onChange={validator} />
                    {error.life_span && <p className='error-message'>{error.life_span}</p>}
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

 //? Validar nombre unico en la DataBase
        // const nameValidator = async (name)=> {
        //     let flag = true;
        //     setValidating('loading')
        //     if (name) {
        //         try {
        //             const { data } = await axios.get(API_NAMES)
        //             data.forEach(n => {
        //                 if (n.toLowerCase() === name.toLowerCase()) {
        //                     setError({...errors, [input]: 'Nombre ya utilizado'});
        //                     setValidating('invalid');
        //                     flag = false;
        //                 }
        //             })
        //             if (flag) {
        //                 delete error.name
        //                 setForm({...form, [input]: name});
        //                 setValidating('valid');
        //             }
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     }
        // };