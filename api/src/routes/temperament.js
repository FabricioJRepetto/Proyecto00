const { Router } = require("express");
const { temperamentList } = require("../controllers/temperament");
const router = Router();

//? Llamamos a los controladores
router.get("/", temperamentList);

module.exports = router;
