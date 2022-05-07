import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_POST } from "../../constants";
import { useGetData, useModal } from "../../helpers";
import { loaded } from "../../slice-reducer/dogsSlice";
import Modal from "../modal/Modal";
import { ReactComponent as IconCancel } from '../../assets/cancel.svg'
import { ReactComponent as IconCheck } from '../../assets/check.svg'
import { ReactComponent as IconClose } from '../../assets/close-icon.svg'

import './Form.css'

const Form = () => {    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [error, setError] = useState({}); 
    const [mount, setMount] = useState(false); 
    const [validating, setValidating] = useState('idle'); 
    const [name, setName] = useState('');
    const [tempList, setTemperaments] = useState([]);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [life_span, setLife_span] = useState('');
    const [data, setData] = useState('');
    const [reqError, setReqError] = useState('');
    const temps = useSelector(state => state.dogs.temps);
    const dogs = useSelector(state => state.dogs.main);
    const [isOpen1, openModal1, closeModal1] = useModal();
    const [isOpen2, openModal2, closeModal2] = useModal();
    
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
                setMount(true)
            }
        }
    };
    const enterHandler =(e)=> {
        if (e.code === 'Enter' && e.target.value) {
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
        setMount(true)
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
            //setValidating('idle')
            setName(value)
            if (value) {
                    if (value?.trim().length < 2) {
                           errors = {...errors, [input]: 'Name too short.'}
                    } else if (!/^[a-z ñáéíóú]*$/gi.test(value)) {
                            errors = {...errors, [input]: 'Only letters and spaces are allowed.'}
                    } else {
                        let flag = true;
                        dogs.forEach(n => {
                            if (n.name.toLowerCase() === value.toLowerCase()) {
                                errors = {...errors, [input]: 'Name alredy in use.'};
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
                    errors = {...errors, [input]: 'Required field.'}
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
                    errors = {...errors, temperaments: 'Select or Create at least one temperament.'}
            } else {
                    delete errors.temperaments
                    forms = {...forms, temperaments: tempList?.join(', ')}
            }
        }
        setError(errors);
        setForm(forms);
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
            name.length < 2 &&  (aux = ({...error, name: 'Required field.'}));
            (tempList.length < 1) &&  (aux = ({...aux, temperaments: 'Required field.'}));
            !height &&  (aux = ({...aux, height: 'Required field.'}));
            !weight &&  (aux = ({...aux, weight: 'Required field.'}));
            !life_span &&  (aux = ({...aux, life_span: 'Required field.'}));
            setError({...aux});
            return console.log('no se envia è_é'); //!!
        }
        if (Object.keys(error).length === 0) {
            console.log('enviando e_e'); //!!
            e.preventDefault();
            try {
                //console.log(form); //!!
                const req = await axios.post(API_POST, form);
                setData({...req.data});
                openModal1();
            } catch (error) {
                if (error.response) {
                    console.log(error.response);
                    //errorModalHandler(error.response.data.message);
                    setReqError(error.response.data)
                    openModal2()
                }
                    setReqError(error)
                    openModal2()
            }
        };
    };

    const handleCloseModal = (redirect) => {
        dispatch(loaded(true));
        closeModal1();
        redirect && navigate(`/home/${data.id}`);
    };
  return(
        <div className="form-page">
        <div className="border-form-container">
            <div className="form-box-container">
                <h2 className="form-title">CREATE A NEW DOG!</h2>
                
                <Modal isOpen={isOpen1} 
                closeModal={closeModal1}>
                    <h1>Creation Succeed!</h1>
                    <p className="dog-name"><b>{data.name}</b></p>
                    <p> is now part of the world!</p>
                    <div>
                        <button className="button-details"
                        onClick={()=>handleCloseModal(true)}>See details</button>
                        <button 
                        className="button-ok"
                        onClick={()=>handleCloseModal(false)}>Great!</button>
                        <img className="modal-image"
                        src={require('./../../assets/pug-creation.png')} alt="succes"/>
                    </div>
                </Modal>

                <Modal isOpen={isOpen2} 
                closeModal={closeModal2}>
                    <div className="modal-container">
                        <h1>Something went wrong</h1>
                        <p>{`${reqError.message}`}</p>
                        <div>
                            <button 
                            className="button-ok"
                            onClick={closeModal2}>Try again</button>
                        </div>
                        <img className="modal-image"
                        src={require('./../../assets/pug-error.png')} alt="error 400"/>
                    </div>
                </Modal>{
//?  ------------ MODALES ------------------------
                }<form autoComplete="off" className="form-container">

                    <div className="form-box">
                        <input type="text" 
                        name='name' 
                        value={name}
                        onChange={validator}
                        placeholder=' '
                        className={`input i-form ${(error.name &&'invalid-input')}`}/>
                        <label className={`placeholder ${(error.name &&'invalid')}`}>name</label>
                        <div className='name-verfication'>{validating !== 'idle'
                            ? validating === 'loading' ? <p>🕗</p>
                                : validating === 'invalid' ? <IconCancel className='icon cancel'/>
                                    : <IconCheck className='icon check'/>
                            : <p></p>
                        }</div>
                        {error.name && <p className='error-message' >{error.name}</p>}
                    </div>

                    <div className="form-box">                    
                        <input type="text" 
                        name='height' 
                        value={height} 
                        className={`input i-form ${(error.height && 'invalid-input')}`}
                        placeholder=' '
                        onChange={validator} />
                        <label className={`${(error.height && 'invalid')}`}>height</label>
                        {error.height && <p className='error-message'>{error.height}</p>}
                    </div>
                    
                    <div className="form-box">                    
                            <input type="text" 
                            name='weight' 
                            value={weight} 
                            className={`input i-form ${(error.weight &&  'invalid-input')}`}
                            placeholder=' '
                            onChange={validator} />
                        <label className={`${(error.weight && 'invalid')}`}>weight</label>
                        {error.weight && <p className='error-message'>{error.weight}</p>}
                    </div>
                    
                    <div className="form-box">                    
                        <input type="text"
                        name='life_span' 
                        value={life_span} 
                        className={`input i-form ${(error.life_span && 'invalid-input')}`}
                        placeholder=' '
                        onChange={validator} />
                        <label className={`${(error.life_span && 'invalid')}`}>lifespan</label>
                        {error.life_span && <p className='error-message'>{error.life_span}</p>}
                    </div>
                    
                     <div className="form-box">
                        <input id='form-temps' 
                        name='temps' 
                        list='form-list-temps'
                        className={`input i-form ${(error.temperaments && 'invalid-input')}`}
                        placeholder=' '
                        onKeyDown={eventSourceCatcher}
                        onChange={eventValueCatcher}
                        onKeyUp={enterHandler}/>
                        <label className={error.temperaments && 'invalid'}>temperaments</label>

                        <datalist id='form-list-temps'>
                            {temps.map(t => (
                                <option key={`form-${t}`} value={t} />
                            ))}
                        </datalist>
                        <div className="filter-temps-box-form">
                            {tempList?.map(t=>
                                <div key={t+"-form"}
                                className="temp-card-form"
                                onClick={deleteCardHandler}>
                                <span>{t}</span>
                                <IconClose className="close-button" /> 
                                </div>
                            )}
                        </div>
                        {error.temperaments && <p className='error-message'>{error.temperaments}</p>}
                    </div>
                        
                    <label className="submit-container">
                        <input type="button" 
                        className="submit-form" 
                        value='Create!' onClick={handleSubmit}/>
                        <img src={require('../../assets/ticket3.png')} alt="submit ticket"/>
                    </label>

                </form>
            </div>
        </div>    
        </div>
  );
};

export default Form;

//  twitter  'https://mobile.twitter.com/i/flow/signup';
//  twitch  'https://www.twitch.tv';
//  Dofus  'https://www.dofus.com/es/mmorpg/jugar';
//  Google  'https://accounts.google.com/info/sessionexpired?continue=https%3A%2F%2Fwww.google.com%2Fsearch%3Fclient%3Dopera-gx%26q%3Dgoogle%26sourceid%3Dopera%26ie%3DUTF-8%26oe%3DUTF-8&hl=es&dsh=S-1425723599%3A1651466382608226&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp';