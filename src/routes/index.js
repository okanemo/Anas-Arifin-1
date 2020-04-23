const router = require("express").Router();
const login = require("./login");
const user = require("./user");
const product = require("./product");

router.use("/", login);
router.use("/user", user);
router.use("/product", product);

module.exports = router;
