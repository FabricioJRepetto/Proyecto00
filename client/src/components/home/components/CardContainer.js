import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { EL_PER_PAGE } from "../../../constants.js";
import Card from './Card.js';

const CardContainer = () =>{
  const [group, setGroup] = useState([]);
  const dogs = useSelector(state => state.dogs.main);
  const filtered = useSelector(state => state.dogs.filtered);
  const page = useSelector(state => state.dogs.page);

  useEffect(() => {
    let source = filtered,    
    end = page * EL_PER_PAGE,       
    start = end-EL_PER_PAGE;
    
    //! por qué no anda un for ?
    setGroup(() => source.slice(start, end))    
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, dogs, page])
  //!                 ⬆
  //! necesito dogs aca?

  return(
    <div>
      {group.map(e => (
        <Card 
        id={e.id} 
        key={e.id} 
        name={e.name} 
        height={e.height} 
        weight={e.weight}
        life_span={e.life_span}
        temps={e.temperaments}
        image={e.image}
        />
      ))}
    </div>
  )
};

export default CardContainer;