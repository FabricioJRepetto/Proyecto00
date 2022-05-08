import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { TEMPS_PER_CARD } from "../../../constants";
import './Card.css'

const Card = ({id, name, image, height, weight, life_span, temps, filter}) => {
    const [tempsBox, setTempsBox] = useState([])
    const [moreTemps, setMoreTemps] = useState(false)
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
        <Link to={`${id}`} className='card'>

        {/* <className={typeof id === 'number' ? 'apidog' : 'dbdog'}> */}
        <p className="dog-name-card">{name}</p>

        <div className='image'>
        {image
            ? <img src={image} alt={name} className='image'/>
            : <h1>🐶</h1>}
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
        

        </Link>
    );
};

export default Card;