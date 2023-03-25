const router = require("express").Router();
const adminController = require("../controllers/adminController");
router.post("/auth/login", adminController.login);
// router.post("/auth/signup", adminController.signup);

module.exports = router;
