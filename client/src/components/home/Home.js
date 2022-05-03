import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { API_DOGS, API_TEMPS } from '../../constants';
import Filters from "./components/Filters";
import CardContainer from "./components/CardContainer";
import Pages from './components/Pages';
import "./Home.css"
import { 
    loadDogs, 
    loadTemps, 
    loadFiltered, 
    loaded, 
    orderBy,
    } from '../../slice-reducer/dogsSlice';

const Home = () => {
  //const dogs = useSelector(state => state.dogs.main);
  const firstLoad = useSelector(state => state.dogs.firstLoad);
  //const filtered = useSelector(state => state.dogs.filtered);
  const dispatch = useDispatch();

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])  

  return(
    <div className='home'>
      <Filters />
      {firstLoad ? <p>/ LOADING . . . /</p> :
      <div className='homeContainer'>
        <Pages />
        <CardContainer />
        <Pages />
      </div>   
      }
    </div>
  );
};

export default Home;
