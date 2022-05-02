import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_DOGS } from "../../constants";
import './Details.css'

const Details = () => {
  const [details, setDetails] = useState({})
  const [error, setError] = useState(false)
  let { id } = useParams();
  
  useEffect(() => {
    const petition = async () => {
      try {
        let { data } = await axios.get(`${API_DOGS}${id}`);
        setDetails(() => data);    
      } catch (err) {
        console.error(err)
        setError(true)
      }
    }
    petition();

    //return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  let { name, height, weight, life_span, temperaments, image } = details;

  return(
      error ? <p>Error</p>
      : <div >
            {!details.id 
            ? <p>/ LOADING /</p> 
            : <>
            <h1 >{name}</h1>
            <div className="details-container">
                
                <div className="image-container">
                <img src={image} alt={`${name}`} className='detail-image'/>
                </div>
                    
                <div className="details">
                    <p><b>Height: </b>{height} cm</p>
                    <p><b>Weight: </b>{weight} kg</p>
                    <p><b>Lifespan: </b>{life_span} years</p>
                    <p><b>Temperaments: </b>{temperaments}</p>
                    <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quam expedita qui architecto rem, repellat nesciunt eaque magni omnis fugiat quod sequi perspiciatis sed at minus commodi assumenda quia. Neque.</h3>
                </div>
            </div>
            </>}
            </div>        
  );
};

export default Details;