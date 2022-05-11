import axios from "axios";

export const wikiExtract = async (name) => {
    let sentences = '2';
// 1) articulos que matchean con el nombre:
    const {data: first} = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=${name}&origin=*`) 
    
// 2) busco 'dog' en la respuesta y selecciono el titulo correcto:
    let { title } = first.query.search.find(e => (
        e.title.toLowerCase().includes('dog') 
        || e.snippet.toLowerCase().includes('dog')
        || e.snippet.toLowerCase().includes('breed')
        ))
    
// 3) extracto:
    const { data } = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${title}&formatversion=2&exsentences=${sentences}&exlimit=1&explaintext=1&origin=*`)
        
    let text = data.query.pages[0].extract;
// 4) formateo el texto:
    if (text) {
        let inicio = text.indexOf('(')
        let final = text.indexOf(')')
    
        let primerTrozo = text.slice(0, inicio)
        let segundoTrozo = text.slice(final+2)

        let trozoFinal = primerTrozo+segundoTrozo;
        return (trozoFinal.replace(/==[a-z 0-9]*==/gi, ''));
    }
        return null;
};
