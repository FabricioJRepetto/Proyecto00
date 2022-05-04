import React, { useEffect } from "react";
import { useDispatch,  } from "react-redux";
import { Link } from 'react-router-dom'
import { viewNav } from '../../slice-reducer/dogsSlice';
import useGetData from "../../utils";
import './LandingPage.css'

const LandingPage = () => {
    const dispatch = useDispatch();

    useGetData()
    useEffect(() => {           
            dispatch(viewNav(false));
            return () =>{
                dispatch(viewNav(true));
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 

  return(
    <div className='landing-page'>
      <h2>LANDING PAGE</h2>
      <Link to="/home">CONTINUE TO MAIN PAGE</Link>
    </div>    
  )
};

export default LandingPage;