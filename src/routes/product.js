const router = require("express").Router();
const product = require("../controllers/product");
const auth = require("../configs/auth.js");
const multer = require("multer");
const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, "./public/img/product");
	},
	filename: function (req, file, callback) {
		callback(null, file.originalname);
	},
});
const upload = multer({
	storage: storage,
});

router.get("/", product.getAllProduct);
router.get("/:id", product.getProduct);
router.post("/", auth, upload.single("image"), product.addProduct);
router.patch("/:id", auth, upload.single("image"), product.editProduct);
router.delete("/", auth, product.deleteProduct);

module.exports = router;
