const { Router } = require("express");
const { dogList, dogID, addDog, dogNames, deleteDog, editDog } = require("../controllers/dog");
const router = Router();

//? Llamamos a los controladores
router.get("/", dogList);
router.get("/names", dogNames);
router.get("/:id", dogID);

router.post("/", addDog);
router.post("/:a", addDog);

router.put("/", editDog);

router.delete("/", deleteDog);

module.exports = router;
