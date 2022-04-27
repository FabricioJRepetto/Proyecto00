import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { EL_PER_PAGE } from "../../../constants.js";
import Card from './Card.js';

const CardContainer = () =>{  
//{id, name, height, weight, life_span, temperaments}
  const [group, setGroup] = useState([]);
  const dogs = useSelector(state => state.dogs.main);
  const page = useSelector(state => state.dogs.page);

  useEffect(() => {
    let source = dogs,    
    end = page * EL_PER_PAGE,       
    start = end-EL_PER_PAGE;
    //totalElements = source.length,
    //totalPages = Math.ceil(totalElements / EL_PER_PAGE),
    //! por qué no anda un for ?
    setGroup(() => source.slice(start, end))    
    // return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]) 
  

  return(
    <div>
      {group.map(e => (
        <Card 
        id={e.id} 
        key={e.id} 
        name={e.name} 
        height={e.height.metric} 
        weight={e.weight.metric}
        life_span={e.life_span}
        temps={e.temperament}
        image={e.image}
        />
      ))}
    </div>
  )
};

export default CardContainer;