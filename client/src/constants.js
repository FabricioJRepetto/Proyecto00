const API_DOGS = "http://localhost:3001/dogs/";
const API_TEMPS = "http://localhost:3001/temperaments/";
const API_POST = 'http://localhost:3001/dogs/';
const EL_PER_PAGE = 15;
const TEMPS_PER_CARD = 3;

module.exports = { API_DOGS, API_TEMPS, API_POST, EL_PER_PAGE, TEMPS_PER_CARD };

/*
? get /dogs/?name=
? get /dogs/:id

: post /dogs/{req.body}

? get /temperaments/

? get /dev/{req.body.pasword}
*/

