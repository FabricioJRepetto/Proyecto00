import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { TEMPS_PER_CARD } from "../../../constants";
import { ReactComponent as IconStars } from '../../../assets/stars.svg'
import { ReactComponent as IconFav } from '../../../assets/favorite-0.svg'
import './Card.css'

const Card = ({id, name, image, height, weight, life_span, temps, filter, favorite}) => {
    const [tempsBox, setTempsBox] = useState([])
    const [moreTemps, setMoreTemps] = useState(false)
    const navigate = useNavigate();
    let props = {
        height, 
        weight, 
        life_span, 
        };

    useEffect(() => {
        if (temps) { 
               let aux = temps.split(", "),
                arr = []

            for (let i = 0; i < TEMPS_PER_CARD; i++) {
                aux[i] && arr.push(aux[i])           
            }
            aux.length > TEMPS_PER_CARD && setMoreTemps(true)
            setTempsBox(arr)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div onClick={()=>navigate(`/home/${id}`)} className='card'>

        {typeof id === 'string' && <IconStars className='createdDog' />}
        {favorite && <IconFav className='favedDog' />}

        <p className="dog-name-card">{name}</p>

        <div className='image'>
        { typeof image === 'string'
            ? <img src={image} alt={name} className='image'/>
            : <img src={require(`../../../assets/default-images/${image}.png`)} 
            alt={name} className='image'/>}
        </div>

        <div className="filter-option">{
            (filter === 'life_span' || filter === 'height' || filter === 'weight')
            ? <>· {filter}: {props[filter]}</>            
            :   <p> </p>
        }</div>

                
            <div className="temps-section">
            <span>· temperaments:</span>
            <div className="cardTemps">
                {tempsBox.map(t =>(
                    <div key={`${id}${t}`} className="tempTag">{t}</div>
                ))}
                {moreTemps && <p className="tempTag">···</p>
                }
            </div>
            </div>
        

        </div>
    );
};

export default Card;