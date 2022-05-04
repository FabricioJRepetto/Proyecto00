import axios from "axios";
import { API_DOGS, API_TEMPS } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { 
    loadDogs, 
    loadFiltered, 
    loadTemps, 
    orderBy, 
    loaded } from "../slice-reducer/dogsSlice";

const useGetData =  () => {
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
        dispatch(loaded())
    }
    firstLoad && petition()
};

export default useGetData;