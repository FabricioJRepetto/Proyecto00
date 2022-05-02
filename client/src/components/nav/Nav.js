import React from "react";
import { Link } from 'react-router-dom'
import './Nav.css'

const navBar = ({visible}) => {
  return(    
    <div className='navBar'>
    { visible && <>
    <h2>NAV BAR / / / / </h2>
      <span>
        <Link to="home">- Home </Link>
        <Link to="about">- About </Link>
        <Link to="create">- Create Dog</Link>
      </span>
    </> }
    </div>
  )
};

//: NavLink
// permite cambiar la clase del elemento para asignarle un estilo diferente cuendo esté activa.
// import { NavLink } from 'react-router-dom'

export default navBar;