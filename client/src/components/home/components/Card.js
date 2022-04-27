import React from "react";

const Card = ({id, name, height, weight, life_span, temps}) => {
  return(
    <div>
      <p><b>{name}</b></p>
      <p>[image placeholder]</p>
      <li>height: {height} cm</li>
      <li>weight: {weight} kg</li>
      <li>lifespan: {life_span}</li>
      <li>temperaments: {temps}</li>
      <li>id: {id}</li>
    </div>
  );
};

export default Card;
