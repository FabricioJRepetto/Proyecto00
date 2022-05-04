import { useSelector } from "react-redux";
import Filters from "./components/Filters";
import CardContainer from "./components/CardContainer";
import Pages from './components/Pages';
import useGetData from '../../utils';
import "./Home.css"

const Home = () => {
    const firstLoad = useSelector(state => state.dogs.firstLoad);

    useGetData()

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
