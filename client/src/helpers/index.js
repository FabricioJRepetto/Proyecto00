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
            a > b ? 1 : a < b ? -1 : 0);
        dispatch(loadDogs(data))
        dispatch(loadFiltered(data))
        dispatch(loadTemps(temps))
        dispatch(orderBy('name'))

        //? limpiar localStore de IDs caducadas
        let idList = data.map(e => e.id);
        let localFavList = await JSON.parse(localStorage.getItem('favList'));
        localFavList = localFavList?.filter(id => idList.includes(id));
        localStorage.setItem('favList', JSON.stringify(localFavList))

        let localCreateList = await JSON.parse(localStorage.getItem('createdList'));
        localCreateList = localCreateList?.filter(id => idList.includes(id));
        localStorage.setItem('createdList', JSON.stringify(localCreateList));

        dispatch(loaded(false))
    }
    firstLoad && petition()
};

export const useModal = (initialValue = false) => {
    const [isOpen, setIsOpen] = useState(initialValue);

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    return [isOpen, openModal, closeModal];
};

export const randomNumber = (max) => {
    return Math.floor(Math.random()* ((max+1)-1)+1);
}

export const errorHandler = (err) => {
    let errorMessage = {
        s: true,
        code: '-',
        message: '-'
    };

    if (err.message) errorMessage = {...errorMessage, code: err.message};
    if (err.response) {
        if (err.response.data.message) {
            errorMessage = {...errorMessage, message: err.response.data.message};
        }
    }

    return errorMessage;
};

//: bad req
// error.message

//: bad network req
// error.request

//: status error. !== 200
// err.response.status
//err.response.data.message
//err.response.data.error