import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetData } from "../../helpers";
import Card from "../home/components/Card";
import './Favs.css'

const Favs = () => {
    const dogs = useSelector(state => state.dogs.main);
    const [favorites, setFavorites] = useState(true)
    let favList = JSON.parse(localStorage.getItem('favList'));
    let createdList = JSON.parse(localStorage.getItem('createdList'));
    
    useGetData()

    return(
        <div className="container-favs-page">
            <div className="favs-buttons-box">

                <div className={`favs-button-border ${favorites ? 'active-bg' : ''}`}>
                    <button 
                    onClick={() => setFavorites(true)} 
                    className={`button ${favorites ? 'active-button' : ''}`}
                    >Favorites</button>
                </div>
                    
                <div className={`favs-button-border ${favorites ? '' : 'active-bg'}`}>
                    <button 
                    onClick={() => setFavorites(false)}
                    className={`button ${favorites ? '' : 'active-button'}`}
                    >Created</button>
                </div>
            </div>
            <div >{
                favorites
                ? <div className="fav-box-border">
                    <div className="fav-box">
                        {dogs.map(e => (
                            favList?.includes(e.id) &&
                            <Card 
                                id={e.id} 
                                key={e.id} 
                                name={e.name} 
                                height={e.height} 
                                weight={e.weight}
                                life_span={e.life_span}
                                temps={e.temperaments}
                                image={e.image}
                                />
                        ))}
                    </div>
                  </div>
                : <div className="fav-box-border">
                    <div className="fav-box">
                        {dogs.map(e => (
                            createdList?.includes(e.id) &&
                            <Card 
                                id={e.id} 
                                key={e.id} 
                                name={e.name} 
                                height={e.height} 
                                weight={e.weight}
                                life_span={e.life_span}
                                temps={e.temperaments}
                                image={e.image}
                                />
                        ))}
                    </div>
                </div>
        }</div>
        </div>
    );
};

export default Favs;
