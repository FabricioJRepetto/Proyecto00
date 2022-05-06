import React, { useEffect } from "react";
import { useDispatch,  } from "react-redux";
import { Link } from 'react-router-dom'
import { viewNav } from '../../slice-reducer/dogsSlice';
import {useGetData} from "../../helpers";
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
        <video src="../../assets/2e8ba8c7-a691-46d9-b5ae-d18050ce273a.mp4"></video>
      <h2>LANDING PAGE</h2>
      <Link to="/home">CONTINUE TO MAIN PAGE</Link>
    </div>    
  )
};

export default LandingPage;