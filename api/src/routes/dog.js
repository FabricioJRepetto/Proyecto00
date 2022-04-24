const { Router } = require("express");
const { dogList, dogID, addDog } = require("../controllers/dog");
const router = Router();

//? Llamamos a los controladores
router.get("/", dogList);
router.get("/:id", dogID);

router.post("/", addDog);
router.post("/:a", addDog);

module.exports = router;
