import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { Link } from 'react-router-dom'
import { API_DOGS, API_TEMPS } from "../../constants";
import { 
    loadDogs, 
    loadFiltered, 
    loadTemps, 
    orderBy, 
    loaded,
    viewNav } from '../../slice-reducer/dogsSlice';

const LandingPage = () => {
    const firstLoad = useSelector(state => state.dogs.firstLoad);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(viewNav(false));
    const getData = async () => {
        let { data } = await axios.get(API_DOGS);
        let { data: temps } = await axios.get(API_TEMPS);
        temps.sort((a, b)=>
            a > b ? 1 : a < b ? -1 : 0)
        dispatch(loadDogs(data))
        dispatch(loadFiltered(data))
        dispatch(loadTemps(temps))
        dispatch(orderBy('name'))
        dispatch(loaded())
    };
    if (firstLoad) getData();    
    return () =>{
        dispatch(viewNav(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return(
    <div>
      <h2>LANDING PAGE</h2>
      <Link to="/home">CONTINUE TO MAIN PAGE</Link>
    </div>    
  )
};

export default LandingPage;