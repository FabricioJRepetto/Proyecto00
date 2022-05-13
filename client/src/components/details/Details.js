import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loaded } from "../../slice-reducer/dogsSlice";
import { useGetData, useModal, errorHandler } from "../../helpers";
import { wikiExtract } from "../../helpers/wiki.js";
import { API_DEL, API_DOGS } from "../../constants";
import { ReactComponent as BackArrow } from '../../assets/back-arrow.svg'
import { ReactComponent as IconDelete } from '../../assets/delete.svg'
import { ReactComponent as IconDraw } from '../../assets/draw.svg'
import { ReactComponent as IconFav } from '../../assets/favorite-0.svg'
import { ReactComponent as IconNoFav } from '../../assets/favorite-1.svg'
import { ReactComponent as IconStars } from '../../assets/stars.svg'
import Modal from "../modal/Modal";
import Form from "../form/Form";
import './Details.css'

const Details = () => {
    const [details, setDetails] = useState({});
    const [error, setError] = useState({s: false});
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [createdList, setCreatedList] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOpenConfirm, openModalConfirm, closeModalConfirm] = useModal();
    const [isOpenNotif, openModalNotif, closeModalNotif] = useModal();
    let { id: idParam } = useParams();

    useGetData();

    useEffect(() => {
        const petition = async () => {
            try {
                let { data } = await axios.get(`${API_DOGS}${idParam}`);
                setDetails({...data});

                let localFavList = await JSON.parse(localStorage.getItem('favList'));
                localFavList.includes(data.id) && setFavorite(true)

                let localCreatedList = JSON.parse(localStorage.getItem('createdList'));
                localCreatedList && setCreatedList(localCreatedList);

                if (!data.id.toString().includes('-')) {
                    let wikiDesc = await wikiExtract(data.name);
                    //console.log(wikiDesc);
                    wikiDesc && setDetails({...data, description: wikiDesc});
                }
            } catch (err) {
                setError(errorHandler(err))
            }
        }
        petition();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  let { id, name, height, weight, life_span, temperaments, image, description } = details;

    const deleteHandler = async () => {
        setLoading(true);
        await axios.delete(API_DEL, {data: {id: id}})
        setLoading(false);
        closeModalConfirm();
        openModalNotif();
    };
    const favHandler = async () => {
        //let id = details.id;
        let listaFavoritos = JSON.parse(localStorage.getItem('favList'));

        if (!listaFavoritos) { // storage vacio
            // agrega id en un array
            localStorage.setItem('favList', JSON.stringify([id]));
            setFavorite(true);
        } else { // storage tiene algo
            if (listaFavoritos.includes(id)) {
                // id repetida, filtro la id, seteo
                listaFavoritos = listaFavoritos.filter(e => e !== id)
                localStorage.setItem('favList', JSON.stringify(listaFavoritos))
                setFavorite(false);
            } else {
                //  id nueva, pusheo id, seteo
                listaFavoritos.push(id);
                localStorage.setItem('favList', JSON.stringify(listaFavoritos));
                setFavorite(true);
            }
        }
    };
    const notifHandler = async () => {
        dispatch(loaded(true))
        closeModalNotif();
        navigate('/home');
    };

  return(
      error.s ? <div className="status-error-message">
                    <p className="ascii">
··········.······················································.···········<br/>
········.n···················.·················.··················n.·········<br/>
··.···.dP··················dP···················9b·················9b.····.··<br/>
·4····qXb·········.·······dX·····················Xb·······.········dXp·····t·<br/>
dX.····9Xb······.dXb····__·························__····dXb.·····dXP·····.Xb<br/>
9XXb._·······_.dXXXXb·dXXXXbo.·················.odXXXXb·dXXXXb._·······_.dXXP<br/>
·9XXXXXXXXXXXXXXXXXXXVXXXXXXXXOo.···········.oOXXXXXXXXVXXXXXXXXXXXXXXXXXXXP·<br/>
··`9XXXXXXXXXXXXXXXXXXXXX'~···~`OOO8b···d8OOO'~···~`XXXXXXXXXXXXXXXXXXXXXP'··<br/>
····`9XXXXXXXXXXXP'·`9XX'··········`98v8P'··········`XXP'·`9XXXXXXXXXXXP'····<br/>
········~~~~~~~·······9X.··········.db|db.··········.XP·······~~~~~~~········<br/>
························)b.··.dbo.dP'`v'`9b.odb.··.dX(·······················<br/>
······················,dXXXXXXXXXXXb·····dXXXXXXXXXXXb.······················<br/>
·····················dXXXXXXXXXXXP'···.···`9XXXXXXXXXXXb·····················<br/>
····················dXXXXXXXXXXXXb···d|b···dXXXXXXXXXXXXb····················<br/>
····················9XXb'···`XXXXXb.dX|Xb.dXXXXX'···`dXXP····················<br/>
·····················`'······9XXXXXX(···)XXXXXXP······`'·····················<br/>
······························XXXX·X.`v'.X·XXXX······························<br/>
······························XP^X'`b···d'`X^XX······························<br/>
······························X.·9··`···'··P·)X······························<br/>
······························`b··`·······'··d'······························<br/>
·······························`·············'·······························<br/>
                    </p>
                    <br/>
                    <h2>Something went wrong</h2>
                    <p>Dog #{idParam} not foud</p>
                    <br/>
                    <p>{error.code}</p>
                    <p>{error.message}</p>
                    <br/>
                    <span onClick={()=>navigate(-1)}><b><u>go back to a safer place</u></b></span>
                </div>
               : <div className="details-page-container">
                    {!details.id
                    ? <div className="loading">
                            <img className="loading-img" src={require('../../assets/loading.png')} alt="loading" />
                      </div> 
                    : <>

                {editMode
                    ? <div className="edit-mode">
                            <div className="edit-form-cont">
                                <div className='details-button back-button-form'>
                                    <BackArrow className='svg-icon' onClick={()=>navigate(-1)}/>
                                    <span className="tooltip">go back</span>
                                </div>
                                <Form editMode={true} id={ id } 
                                initialName={ details.name }/>
                            </div>
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
                            
                        <div className="background-details">

                            <div className="details-buttons-container">
                                <div className='details-button back-button'>
                                    <BackArrow className='svg-icon' onClick={()=>navigate(-1)}/>
                                    <span className="tooltip">go back</span>
                                </div>
                                <div className='details-button fav-button' >
                                    { favorite
                                    ? <div>
                                        <IconFav className='svg-icon-fav faved' onClick={favHandler}/>
                                        <span className="tooltip">remove from favorites</span>
                                    </div>
                                    : <div>
                                        <IconNoFav className='svg-icon-fav' onClick={favHandler}/>
                                        <span className="tooltip">add to favorites</span>
                                    </div>}
                                </div>

                                {(typeof id === 'string' && createdList?.includes(id)) &&
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

                            <div className="border-details-container">
                                {(typeof id === 'string' && createdList?.includes(id)) && <IconStars className='icon-stars' />}
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
                                            <p>{ description 
                                            ? description 
                                            : <>
                                                <div className="loading">
                                                    <img className="loading-img" src={require('../../assets/loading.png')} alt="" />
                                                </div> 
                                             </> }</p>
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

//? en el hook useGetData, cargo en redux la lista del localStorage.
        // JSON.parse(localStorage.getItem('favList'));
        //? cuando toco el boton de favs, me fijo si la id esta en el estado de redux;
        //: si está, la borro.
        //* si no está, la agrego.
        //? en ambos casos actualizo la localStorage.
        // localStorage.setItem('favList', JSON.stringify(favList));