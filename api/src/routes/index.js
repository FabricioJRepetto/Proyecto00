const { Router } = require("express");
const router = Router();
const Dev = require("./dev.js"); //!
const Dog = require("./dog.js");
const Temperament = require("./temperament.js");

router.use("/devExp", Dev); //!
router.use("/dogs", Dog);
router.use("/temperaments", Temperament);

module.exports = router;
