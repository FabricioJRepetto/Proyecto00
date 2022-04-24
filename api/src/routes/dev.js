const { Router } = require("express");
const { devExp } = require("../controllers/dev");
const router = Router();

//? Llamamos a los controladores
router.get("/", devExp);

module.exports = router;
