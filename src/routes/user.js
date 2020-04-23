const router = require("express").Router();
const user = require("../controllers/user");
const auth = require("../configs/auth.js");
const multer = require("multer");
const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, "./public/img/avatar");
	},
	filename: function (req, file, callback) {
		callback(null, file.originalname);
	},
});
const upload = multer({
	storage: storage,
});

router.get("/", auth, user.getUser);
router.get("/all", auth, user.getAllUser);
router.get("/:username", user.getUser);
router.post("/", auth, upload.single("avatar"), user.editUser);
router.patch("/:username", auth, upload.single("avatar"), user.editUser);
router.delete("/", auth, user.deleteUser);

module.exports = router;
