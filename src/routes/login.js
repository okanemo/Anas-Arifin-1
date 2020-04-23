const router = require("express").Router();
const login = require("../controllers/login");

router.post("/login", login.login);
router.post("/register", login.register);
router.post("/verify", login.verify);

module.exports = router;
