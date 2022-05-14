import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_DOGS, API_POST } from "../../constants";
import { errorHandler, useGetData, useModal } from "../../helpers";
import { loaded } from "../../slice-reducer/dogsSlice";
import Modal from "../modal/Modal";
import { ReactComponent as IconCancel } from '../../assets/cancel.svg'
import { ReactComponent as IconCheck } from '../../assets/check.svg'
import { ReactComponent as IconClose } from '../../assets/close-icon.svg'
import { ReactComponent as IconStars } from '../../assets/stars.svg'
import './Form.css'

var defaultImages =[];

const Form = ({ editMode = false, id, initialName }) => {
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
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(1);

    const [data, setData] = useState('');
    const [reqError, setReqError] = useState('');
    const temps = useSelector(state => state.dogs.temps);
    const dogs = useSelector(state => state.dogs.main);
    const [isOpen1, openModal1, closeModal1] = useModal();
    const [isOpen2, openModal2, closeModal2] = useModal();
    const [isOpen3, openModal3, closeModal3] = useModal();
    const [isOpen4, openModal4, closeModal4] = useModal();
    const [isOpenLoading, openModalLoading, closeModalLoading] = useModal();

    useGetData()

    useEffect(() => {
      const loadEditData = async () => {
            const { data } = await axios.get(`${API_DOGS}${id}`)
            let { name, 
            height, 
            weight, 
            life_span, 
            temperaments, 
            image, 
            description } = data;

            setName(name);
            setHeight(height);
            setWeight(weight);
            setLife_span(life_span);
            setDescription(description);
            setImage(image);
            setTemperaments(temperaments.split(', '));
            setForm({name, height, weight, life_span, temperaments, image, description})
      };
      editMode && loadEditData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

//? pre load images for later rendering 
    let importAll = (r) => {
        return r.keys().map(r);
    };
    useEffect(() => {
       defaultImages = importAll(require.context('../../assets/default-images', false, /\.(png)$/));
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

//? descriptionHandler
    const descriptionHandler = (e) => {
        setDescription(e.target.value)
    }

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
                    errors = {...errors, [input]: 'Only numbers and - are allowed.'}
                } else if (!/^\d{1,2}-\d{1,2}$/.test(value)){
                    errors = {...errors, [input]: `Have to respect syntax; i.e.: '12-34'`}
                } else {
                    let min = parseInt(value.split('-')[0])
                    let max = parseInt(value.split('-')[1])
                    if (min > max) {
                    errors = {...errors, [input]: `The first number can't be greater than the second one.`}
                    } else {
                        delete errors[input]
                        forms = {...forms, [input]: value};
                    }
                }
            } else {
                    delete forms[input];
                    errors = {...errors, [input]: 'Required field.'}
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
                        let dogsNames;

                        editMode 
                        ? (dogsNames = dogs.filter(d => d.name !== initialName))
                        : dogsNames = dogs;

                        dogsNames.forEach(n => {
                            if (n.name.toLowerCase() === value.toLowerCase()) {
                                errors = {...errors, [input]: 'Name alredy in use.'};
                                setValidating('invalid');
                                return flag = false;
                            }
                        })
                        if (flag) {
                            delete errors.name
                            setValidating('valid');
                            let upperName = name.charAt().toUpperCase() + name.slice(1)
                            forms = {...forms, [input]: upperName};
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
    useEffect(() => {
        setForm({...form, description: description, image: image})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description, image])
    

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
            console.log('enviando... e_e'); //!!
            e.preventDefault();
            openModalLoading();
            setForm({...form, image: image});
            
            try {
                if (editMode) {
                    const req = await axios.put(API_POST, {...form, id: id});
                    setData({...req.data});
                    closeModalLoading();
                    openModal4()
                } else {
                    const req = await axios.post(API_POST, form);
                    setData({...req.data});

                    //? agrego ID a la localStore
                    let listaCreados = JSON.parse(localStorage.getItem('createdList'));
                    if (!listaCreados) { // estaba vacio, seteo la id en un ARRAY
                        localStorage.setItem('createdList', JSON.stringify([req.data.id]));
                    } else { // ya tenía algo, pusheo la id y seteo
                        listaCreados.push(req.data.id);
                        localStorage.setItem('createdList', JSON.stringify(listaCreados));
                    }
                    closeModalLoading();
                    openModal1();
                }
            } catch (err) {
                setReqError(errorHandler(err))
                closeModalLoading();
                openModal2()
            }
        };
    };

    const imageClickHandler = (e) => {
        let file = e.target.id
        setImage(file)
        closeModal3();
    };
    const handleCloseModal = (redirect) => {
        dispatch(loaded(true));
        closeModal1();
        redirect ? navigate(`/home/${data.id}`) : window.location.reload();
    };
    const handleSaveModal = () => {
        dispatch(loaded(true));
        closeModal4();
        window.location.reload();
    };

  return(
    <div className="form-page">
        <div className="border-form-container">
            <div className="form-box-container">   
                <div className="form-title">
                   <IconStars className='icon-stars-form' />
                    <h2 >{editMode ? 'EDITING A DOG...' : 'CREATE A NEW DOG!'}</h2>
                </div>{
    //?  ------------ MODAL 1 ------------------------
                }<Modal isOpen={isOpen1} 
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
                        </div>
                    </Modal>{
    //? ------------ MODAL 2 ------------------------
                }<Modal isOpen={isOpen2} 
                    closeModal={closeModal2}>
                        <div className="modal-container">
                            <h1>Something went wrong</h1>
                            <p>{reqError.code}</p>
                            <p>{reqError.message}</p>
                            <div>
                                <button 
                                className="button-ok"
                                onClick={closeModal2}>Try again</button>
                            </div>
                        </div>
                    </Modal>{
    //? ------------ MODAL 3 ------------------------
                }<Modal isOpen={isOpen3} 
                    closeModal={closeModal3}>
                        <div className="modal-container">
                            <h1>Select an image for your breed</h1>
                            <div className="image-form-container">
                                    {defaultImages.map((img, index) => (
                                        <button onClick={imageClickHandler} key={img+'button'} id={index+1} className='def-img-button'>
                                            <img src={img} key={img+'img'} alt={img} className="def-img"/>
                                        </button>
                                    ))}
                            </div>
                            <button className="button-ok" onClick={closeModal3}> X </button>
                        </div>
                    </Modal>{
    //?  ------------ MODAL 4 ------------------------
                    }<Modal isOpen={isOpen4}>
                        <h1>Changes applied</h1>
                        <button className="button-ok" onClick={handleSaveModal}>Great!</button>
                    </Modal>{
//?  ------------ MODAL LOADING ------------------------
                    }<Modal isOpen={isOpenLoading}>
                        <div className="loading">
                            <img className="loading-img" src={require('../../assets/loading.png')} alt="" />
                        </div> 
                    </Modal>


                    <form autoComplete="off" className="form-container">
                        <div className="inputs-containers">

                            <div className="inputs-container-a">
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
                                    <input type="number" 
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
                            </div>

                            <div className="inputs-container-b">
                                <p className="image-tag">Select an image</p>
                                <div className="form-image-selection" onClick={openModal3}>
                                    <img src={require(`../../assets/default-images/${image}.png`)} alt="select" className="def-img selected-img"/>
                                </div>
                                
                                <div className="form-box">                    
                                    <textarea name='description' 
                                    value={description} 
                                    className={'input i-form'}
                                    placeholder=' '
                                    onChange={descriptionHandler} />
                                    <label className={``}>description</label>
                                </div>

                            </div>

                        </div>

                        <label className="submit-container">
                            <input type="button" 
                            className="submit-form" 
                            value={editMode ? 'Save' : 'Create'} onClick={handleSubmit}/>
                            <img src={require('../../assets/ticket3.png')} alt="submit ticket"/>
                        </label>

                    </form>
                </div>
            </div>    
        </div>
  );
};

export default Form;