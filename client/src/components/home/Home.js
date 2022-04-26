import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { load } from '../../slice-reducer/dogsSlice';
import { API_URL } from '../../constants';

import Filters from "./components/Filters";
import CardContainer from "./components/CardContainer";
import Pages from './components/Pages';

const Home = () => {
  const dogs = useSelector(state => state.dogs.value);
  const filter = useSelector(state => state.filter.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const getDogs = async () => {
      let { data } = await axios.get(API_URL);
      dispatch(load(data))
    };
    getDogs();
  }, [])  

  return(
    <>
      <Filters />
      {dogs.length[0] ? <p>/ LOADING . . . /</p> :
      <>
        <CardContainer dogs={dogs}/>
        <Pages />   
      </>   
      }
    </>
  );
};

export default Home;
