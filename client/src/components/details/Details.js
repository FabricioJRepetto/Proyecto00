import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_DOGS } from "../../constants";

const Details = () => {
  const [details, setDetails] = useState({})
  let { id } = useParams();
  
  useEffect(() => {
    const petition = async () => {
      try {
        let { data } = await axios.get(`${API_DOGS}${id}`);
        setDetails(() => data);    
      } catch (err) {
        console.error(err)
      }
    }
    petition();

    //return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  let { name, height, weight, life_span, temperaments, image } = details;

  return(
    <div>
      {!details.id 
      ? <p>/ LOADING /</p> 
      : <>
      <h2>{name}</h2>
      <img src={image} alt={`${name}`}/>
      <p><b>Height: </b>{height} cm</p>
      <p><b>Weight: </b>{weight} kg</p>
      <p><b>Lifespan: </b>{life_span} years</p>
      <p><b>Temperaments: </b>{temperaments}</p>
      </>}
    </div>

  );
};

export default Details;