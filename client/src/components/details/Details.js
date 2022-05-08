import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { wikiExtract } from "../../helpers";
import { API_DOGS } from "../../constants";
import { ReactComponent as BackArrow } from '../../assets/back-arrow.svg'
import './Details.css'

const Details = () => {
    let lorem = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia natus quo, aliquid maiores ducimus, omnis nulla magni repudiandae sequi, aspernatur labore. Optio maxime alias consequuntur amet molestiae molestias quisquam illum.'
    const [details, setDetails] = useState({desc: lorem})
    const [error, setError] = useState(false)
    const navigate = useNavigate();
    let { id } = useParams();
    
    useEffect(() => {
        const petition = async () => {
        try {
            let { data } = await axios.get(`${API_DOGS}${id}`);
            setDetails({...data});
            let wikiDesc = await wikiExtract(data.name);
            console.log(wikiDesc);
            wikiDesc && setDetails({...data, desc: wikiDesc});
        } catch (err) {
            console.error(err)
            setError(err)
        }
        }
        petition();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  let { name, height, weight, life_span, temperaments, image, desc } = details;

  return(
      error ? <div>
          <h2>Something went wrong</h2>
          <p>Dog #{id} not foud</p>
      </div>
      : <div className="details-page-container">
            {!details.id 
            ? <p>/ LOADING /</p> 
            : <>
            <div className="details-container">

                <div className="border-details-container">
                    <div className="details-header">
                        <BackArrow className='back-button' onClick={()=>navigate(-1)}/>
                        <h1>{name}</h1>
                    </div>

                    <div className="details-body">
                        <img src={image} alt={`${name}`} className='detail-image'/>
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
                                <p>{ desc }</p>
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