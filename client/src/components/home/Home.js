import { useSelector } from "react-redux";
import Filters from "./components/Filters";
import CardContainer from "./components/CardContainer";
import Pages from './components/Pages';
import {useGetData} from '../../helpers';
import "./Home.css"
import TopFilters from "./components/TopFilters";
import BackToTop from "../backToTop/BackToTop";

const Home = () => {
    const firstLoad = useSelector(state => state.dogs.firstLoad);

    useGetData()

    return(
        <div className='home'>
        <Filters />
        {firstLoad 
            ? <div className="loading">
                    <img className="loading-img" src={require('../../assets/loading.png')} alt="" />
            </div> 
            : <div className='homeContainer'>
                <TopFilters />
                <CardContainer />
                <Pages />
                <BackToTop />
            </div>   
        }
        </div>
    );
};

export default Home;
