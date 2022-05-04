import axios from "axios";
import useGetData from "../../utils";

const About = () => {
    useGetData()

   

    

   //https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=jupiter&formatversion=2&exsentences=3&exlimit=1&explaintext=1

    const NAME = 'Afghan Hound';
    const SENTENCES = '2'
const preops =async()=> {
    
    const {data} = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${NAME}&formatversion=2&exsentences=${SENTENCES}&exlimit=1&explaintext=1&origin=*`)
    
    let text = data.query.pages[0].extract

    let inicio = text.indexOf('(')
    let final = text.indexOf(')')

    let primerTrozo = text.slice(0, inicio)
    let segundoTrozo = text.slice(final+2)


    console.log(primerTrozo+segundoTrozo);
}
preops()
    return(
        <div>
        {/* <h2>About this project</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed animi ullam pariatur facere quo saepe, quam officiis, quasi excepturi possimus suscipit totam, quidem reiciendis illo laborum consequuntur dolore exercitationem est!</p>
        <br/>
        <p><b>Lorem@ipsum.dolor</b></p> */}
        <h2>data</h2>
        <p>data.query.pages[0].extract</p>
        </div>
    );
};

export default About;