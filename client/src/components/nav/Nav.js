import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from 'react-router-dom'
import './Nav.css'
import { } from '../../assets/logo.png'

const NavBar = () => {    
    const nav = useSelector(state => state.dogs.nav)
    return(    
        <div className='navBar'>
        { nav && <>
        <div className="logo">
        <div className="logo-bg"></div>
        <Link to="home">

            <img src={require('../../assets/logo.png')} alt="logo" className="logo-img"/>
            <div className="logo-name">
                <p>DOG</p> 
                <p>HOUSE</p> 
            </div>

        </Link>
        </div>

        <div className="nav-buttons">
            <Link to="home" className="buttons nav-home"> <p>Home</p> 
                <div className="relleno relleno-home"></div>
            </Link>
            <Link to="create" className="buttons nav-create"> 
            <p>Create</p> 
               <div className="relleno relleno-create"></div>
            </Link>
            <Link to="home" className="buttons nav-dogs"> <p>My Dogs</p> 
               <div className="relleno relleno-dogs"></div>
            </Link>
            <Link to="about" className="buttons nav-about">
                <p>About</p>
                <div className="relleno relleno-about"></div>
            </Link>
        </div>
        </>}
        </div>
    )
};

//: NavLink
// permite cambiar la clase del elemento para asignarle un estilo diferente cuendo esté activa.
// import { NavLink } from 'react-router-dom'

export default NavBar;