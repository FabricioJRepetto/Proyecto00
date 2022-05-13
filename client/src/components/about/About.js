import { useGetData } from "../../helpers";
import './About.css'

const About = () => {
    useGetData()
    return(
        <div className="about-container">
                <div className="about-border">
            <div className="about-box">

                <div className="about-text">
                    <h2 className="sent">About this project:</h2>
                    <p className="sent">In this project I put to the test the knowledge I acquired over the last few months.
                        The objective was develop a database which, with support of an external API, will work as an API for a web app.
                        This was accomplished using Sequelize, PostgreSQL, Express.
                        The website, made with React and Redux, shows results of different dog breeds, which can be filtered with various parameters. In addition, it offers the possibility to add dogs to a list of favorites and also to create, edit and delete custom dogs, which are stored in the database.
                    </p>
                    <a href="https://github.com/FabricioJRepetto/Proyecto00" target="_blank" rel="noopener noreferrer" className="sent"><b><u>GitHub repository</u></b></a>
                </div>

                <div className="logos">
                    <span>
                        <div>
                            <img src={require('../../assets/logos/react_logo_icon_144942.png')} alt="logo" />
                        </div>
                        <div>
                            <img src={require('../../assets/logos/redux_icon_132038.png')} alt="logo" />
                        </div>
                    </span>

                    <span>
                        <div>
                            <img src={require('../../assets/logos/express_original_logo_icon_146527.png')} alt="logo" />
                        </div>
                        <div>
                            <img src={require('../../assets/logos/sequelize_icon_132004.png')} alt="logo" />
                        </div>
                        <div>
                            <img src={require('../../assets/logos/dbs-postgresql_icon-icons.com_50907.png')} alt="logo" />
                        </div>
                    </span>

                    <span>
                        <div>
                            <img src={require('../../assets/logos/adb-illustrator_icon-icons.com_50964.png')} alt="logo" />
                        </div>
                        <div>
                            <img src={require('../../assets/logos/adb-photoshop_icon-icons.com_50960.png')} alt="logo"  />
                        </div>
                    </span>

                </div>
                </div>  
            </div>
        </div>
    );
};

export default About;
