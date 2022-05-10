import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetData, wikiExtract } from "../../helpers";
import { API_DEL, API_DOGS } from "../../constants";
import { ReactComponent as BackArrow } from '../../assets/back-arrow.svg'
import { ReactComponent as IconDelete } from '../../assets/delete.svg'
import { ReactComponent as IconDraw } from '../../assets/draw.svg'
import Modal from "../modal/Modal";
import { useModal } from "../../helpers";
import './Details.css'
import { loaded } from "../../slice-reducer/dogsSlice";
import { useDispatch } from "react-redux";
import Form from "../form/Form";

const Details = () => {
    const [details, setDetails] = useState({})
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOpenConfirm, openModalConfirm, closeModalConfirm] = useModal();
    const [isOpenNotif, openModalNotif, closeModalNotif] = useModal();
    let { id: idParam } = useParams();
    
    useGetData();

    //? petición a wiki
    useEffect(() => {
        const petition = async () => {
        try {
            let { data } = await axios.get(`${API_DOGS}${idParam}`);
            setDetails({...data});

            if (!data.id.toString().includes('-') && !data.description) {
                let wikiDesc = await wikiExtract(data.name);
                console.log(wikiDesc);
                wikiDesc && setDetails({...data, description: wikiDesc});
            }
        } catch (err) {
            console.error(err)
            setError(err)
        }
        }
        petition();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  let { id, name, height, weight, life_span, temperaments, image, description } = details;

    const deleteHandler = async () => {
        setLoading(true);
        const petition = await axios.delete(API_DEL, {data: {id: id}})
        setLoading(false);
        console.log(petition.statusText); 
        closeModalConfirm();
        openModalNotif();
    };
    const notifHandler = async () => {
        dispatch(loaded(true))
        closeModalNotif();
        navigate('/home');
    };

  return(
      error ? <div>
                    <h2>Something went wrong</h2>
                    <p>Dog #{idParam} not foud</p>
                    <p>{error}</p>
                </div>
               : <div className="details-page-container">
                    {!details.id //: cambiar a description cuando fuincione bien la peticiona a wikipedia
                    ? <div className="loading">
                            <img className="loading-img" src={require('../../assets/loading.png')} alt="loading" />
                      </div> 
                    : <>

                {editMode
                    ? <div className="edit-mode">
                            <div className='details-button back-button edit-mode-back-button'>
                                    <BackArrow className='svg-icon' onClick={()=>setEditMode(false)}/>
                                    <span className="tooltip">go back</span>
                            </div>
                            <Form editMode={true} id={ id } 
                            initialName={ details.name }/>
                      </div>
                    :<div className="details-container">

                    <Modal isOpen={isOpenConfirm}>
                        {loading 
                        ? <div className="loading">
                                <img className="loading-img" src={require('../../assets/loading.png')} alt="loading" />
                            </div>
                        :<>
                        <h1>You're about to delete this dog</h1>
                        <p>
                            <span>Are you sure you want to delete </span>
                            <span className="dog-name">{name}</span>
                            <span>?</span>
                        </p>
                        <p>This action is not reversible.</p>
                            
                        <div>
                            <button onClick={deleteHandler} className='button-delete'>DELETE</button>
                            <button onClick={closeModalConfirm} className='button-ok'>CANCEL</button>
                        </div>
                        </>}
                    </Modal>

                    <Modal isOpen={isOpenNotif}>
                        <h1>Deleted successfully</h1>
                        <p>{name} is no longer part of this world.</p>
                        <button onClick={notifHandler} className='button-ok'>ACCEPT</button>
                    </Modal>
                    
                        <div className="details-buttons-container">
                            <div className='details-button back-button'>
                                <BackArrow className='svg-icon' onClick={()=>navigate(-1)}/>
                                <span className="tooltip">go back</span>
                            </div>

                            {typeof id === 'string' && 
                            <>
                                <div className='details-button edit-button' 
                                    onClick={() =>setEditMode(true)}>
                                    <IconDraw className='svg-icon'/>
                                    <span className="tooltip">edit dog's information</span>
                                </div>
                                <div className='details-button delete-button'>
                                    <IconDelete className='svg-icon' onClick={openModalConfirm} />
                                    <span className="tooltip">delete dog</span>
                                </div>
                            </>}
                        </div>
                            
                        <div className="background-details">
                            <div className="border-details-container">
                                <div className="details-header">
                                    <h1>{name}</h1>
                                </div>

                                <div className="details-body">
                                {typeof id === 'string'
                                    ?<img src={require(`../../assets/default-images/${image}.png`)} 
                                    alt={`${name}`} className='detail-image'/>
                                    :<img src={image} alt={`${name}`} className='detail-image'/>}

                                    <div className="details">
                                        <p className="detail-element"><b>Height: </b>{height} cm</p>
                                        <p className="detail-element"><b>Weight: </b>{weight} kg</p>
                                        <p className="detail-element"><b>Lifespan: </b>{life_span} years</p>
                                        <div className="detail-element">
                                        <p><b>Temperaments:</b></p>
                                        <p>{temperaments}</p>
                                        </div>
                                        <div className="desc-text">
                                            <p><b>Description:</b></p>
                                            <p>{ description }</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                </div>}
            </>}
            </div>        
  );
};

export default Details;