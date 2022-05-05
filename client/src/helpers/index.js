import axios from "axios";
import { API_DOGS, API_TEMPS } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { 
    loadDogs, 
    loadFiltered, 
    loadTemps, 
    orderBy, 
    loaded } from "../slice-reducer/dogsSlice";
import { useState } from "react";

export const useGetData =  () => {
    const dispatch = useDispatch();
    const firstLoad = useSelector(state => state.dogs.firstLoad);

    const petition = async () => {
        let { data } = await axios.get(API_DOGS);
        let { data: temps } = await axios.get(API_TEMPS);
        temps.sort((a, b)=>
            a > b ? 1 : a < b ? -1 : 0)
        dispatch(loadDogs(data))
        dispatch(loadFiltered(data))
        dispatch(loadTemps(temps))
        dispatch(orderBy('name'))
        dispatch(loaded(false))
    }
    firstLoad && petition()
};

export const wikiExtract = async (NAME) => {
    const SENTENCES = '2';

    const {data} = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${NAME}&formatversion=2&exsentences=${SENTENCES}&exlimit=1&explaintext=1&origin=*`)
        
    let text = data.query.pages[0].extract;
    console.log(text);
    if (text) {
        let inicio = text.indexOf('(')
        let final = text.indexOf(')')
    
        let primerTrozo = text.slice(0, inicio)
        let segundoTrozo = text.slice(final+2)

        return (primerTrozo+segundoTrozo);
    }
        return null;
};

export const useModal = (initialValue = false) => {
    const [isOpen, setIsOpen] = useState(initialValue);

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    return [isOpen, openModal, closeModal];
};