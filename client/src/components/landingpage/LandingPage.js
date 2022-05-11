import React, { useEffect, useRef, useState } from "react";
import { useDispatch,  } from "react-redux";
import { Link } from 'react-router-dom'
import { viewNav } from '../../slice-reducer/dogsSlice';
import { useGetData, randomNumber } from "../../helpers";
import Video1 from '../../assets/videos/1.mp4'
import Video2 from '../../assets/videos/2.mp4'
import Video3 from '../../assets/videos/3.mp4'
import Video4 from '../../assets/videos/4.mp4'
import './LandingPage.css'

const LandingPage = () => {
    const dispatch = useDispatch();
    
    let  bgVideo = Video1;
    let random = randomNumber(4);
    switch (random) {
        case 1:
            bgVideo = Video1;
            break;
        case 2:
            bgVideo = Video2;
            break;
        case 3:
            bgVideo = Video3;
            break;
        default:
            bgVideo = Video4;
            break;
    }

    useGetData()
    useEffect(() => {
            dispatch(viewNav(false));
            return () =>{
                dispatch(viewNav(true));
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 

  return(
    <div className={'landing-page'}>
        <div className={'landing-page-container'}>

            <video id="background-video" autoPlay loop muted>
                <source src={bgVideo} type="video/mp4"/>
            </video>
            <h1>Welcome!</h1>
            <Link to="home" className="landing-logo-link">
                <img src={require('../../assets/logo.png')} alt="logo" className="landing-logo-img logo-img"/>
                <div className="landing-logo-name">
                    <p><b>DOG</b></p> 
                    <p><b>HOUSE</b></p> 
                </div>
            </Link>
            <Link to="/home">CONTINUE TO MAIN PAGE</Link>

        </div>
    </div>    
  )
};

export default LandingPage;