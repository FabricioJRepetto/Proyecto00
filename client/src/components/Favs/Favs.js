import { useGetData } from "../../helpers";
import CardContainer from '../home/components/CardContainer'
import './Favs.css'

const Favs = () => {
    useGetData()
    return(
        <div className="container-favs-page">
            <CardContainer />
        </div>
    );
};

export default Favs;
