const { Router } = require("express");
const { dogList, bodyFindOne, queryFind, addDog } = require("../controllers/dog");
const router = Router();

//? Llamamos a los controladores
router.get("/", dogList);

router.post("/", addDog); // Post

module.exports = router;
