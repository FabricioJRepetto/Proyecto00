import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EL_PER_PAGE } from "../../../constants.js";
import Card from './Card.js';
import './CardContainer.css'

const CardContainer = () =>{
  const [group, setGroup] = useState([]);
  const dogs = useSelector(state => state.dogs.main);
  const filtered = useSelector(state => state.dogs.filtered);
  const page = useSelector(state => state.dogs.page);
  const filters = useSelector(state => state.dogs.filters);

  useEffect(() => {
    let end = page * EL_PER_PAGE,       
    start = end-EL_PER_PAGE;    
    //! por qué no anda un for ?
    setGroup(() => filtered.slice(start, end))    
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, dogs, page])
  //!                 ⬆
  //! necesito dogs aca?

  return(
    <div className="cardContainer">
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
        filter={filters.order}
        />
      ))}
    </div>
  )
};

export default CardContainer;