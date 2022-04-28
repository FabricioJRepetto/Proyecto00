import React from "react";
import { Link } from 'react-router-dom';

const Card = ({id, name, height, weight, life_span, temps}) => {
  return(
    <Link to={`${id}`}>
      <p><b>{name}</b></p>
      <p>[image placeholder]</p>
      <li>height: {height} cm</li>
      <li>weight: {weight} kg</li>
      <li>lifespan: {life_span}</li>
      <li>temperaments: {temps}</li>
      <li>id: {id}</li>
    </Link>
  );
};

export default Card;