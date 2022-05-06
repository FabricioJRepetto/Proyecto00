import { useSelector } from "react-redux";
import Filters from "./components/Filters";
import CardContainer from "./components/CardContainer";
import Pages from './components/Pages';
import {useGetData} from '../../helpers';
import "./Home.css"

const Home = () => {
    const firstLoad = useSelector(state => state.dogs.firstLoad);

    useGetData()

    return(
        <div className='home'>
        <Filters />
        {firstLoad 
            ? <div className="loading">
                    <img src={require('../../assets/loading.png')} alt="" className="loading-img"/>
            </div> 
            : <div className='homeContainer'>
            <Pages />
            <CardContainer />
            <Pages />
        </div>   
        }
        </div>
    );
};

export default Home;
