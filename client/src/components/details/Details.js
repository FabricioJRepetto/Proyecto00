import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { wikiExtract } from "../../helpers";
import { API_DEL, API_DOGS } from "../../constants";
import { ReactComponent as BackArrow } from '../../assets/back-arrow.svg'
import { ReactComponent as IconCancel } from '../../assets/cancel.svg'
import './Details.css'

const Details = () => {
    const [details, setDetails] = useState({})
    const [error, setError] = useState(false)
    const navigate = useNavigate();
    let { id: idParam } = useParams();
    
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
        const petition = await axios.delete(API_DEL, {data: {id: id}})
        console.log(petition.statusText);
    };

  return(
      error ? <div>
          <h2>Something went wrong</h2>
          <p>Dog #{idParam} not foud</p>
      </div>
      : <div className="details-page-container">
            {!details.id 
            ? <div className="loading">
                    <img className="loading-img" src={require('../../assets/loading.png')} alt="loading" />
            </div> 
            : <>
            <div className="details-container">

                <div className="border-details-container">
                    <div className="details-header">
                        <BackArrow className='back-button' onClick={()=>navigate(-1)}/>
                        {typeof id === 'string' && <IconCancel className='back-button delete-button' onClick={deleteHandler} />}
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
            </>}
            </div>        
  );
};

export default Details;