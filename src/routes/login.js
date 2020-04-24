const router = require("express").Router();
const login = require("../controllers/login");
const user = require("../controllers/user");
const auth = require('../configs/auth')

router.post("/login", login.login);
router.post("/register", login.register);
router.post("/verify", auth, user.getUser);

module.exports = router;
