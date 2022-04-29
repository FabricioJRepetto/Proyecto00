const API_DOGS = "http://localhost:3001/dogs/";
const API_TEMPS = "http://localhost:3001/temperaments/";
const EL_PER_PAGE = 10;

module.exports = { API_DOGS, API_TEMPS, EL_PER_PAGE };

/*
? get /dogs/?name=
? get /dogs/:id

: post /dogs/{req.body}

? get /temperaments/

? get /dev/{req.body.pasword}
*/

