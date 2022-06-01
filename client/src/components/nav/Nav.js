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
            <img src={require('../../assets/logo.png')} alt="logo" className="nav-logo-img logo-img"/>
            <div className="logo-name">
                <p>DOG</p> 
                <p>HOUSE</p> 
            </div>
        </Link>
        </div>

        <div className="nav-buttons">

            <NavLink to="home" className="buttons nav-home" activeclassname='active'> <p>Home</p> 
                <img src={require('../../assets/button-home.png')} className="relleno" alt='home button background' />
            </NavLink>

            <NavLink to="create" className="buttons nav-create" activeclassname='active'> 
            <p>Create</p> 
               <img src={require('../../assets/button-create.png')} className="relleno" alt='home button background' />
            </NavLink>

            <NavLink to="favourites" className="buttons nav-dogs" activeclassname='active'> <p>My Dogs</p> 
               <img src={require('../../assets/button-dogs.png')} className="relleno" alt='home button background' />
            </NavLink>
             
            <NavLink to="about" className="buttons nav-about" activeclassname='active'>
                <p>About</p>
               <img src={require('../../assets/button-about.png')} className="relleno" alt='home button background' />
            </NavLink>
        </div>
        </>}
        </div>
    )
};

export default NavBar;