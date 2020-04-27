const product = require("../models/product");

module.exports = {
	getAllProduct: (req, res) => {
		product.getAllProduct().then((resolve) => {
			res.json(resolve);
		});
	},
	getProduct: (req, res) => {
		product.getProduct(req.params.id).then((resolve) => {
			res.json(resolve);
		});
	},
	addProduct: (req, res) => {
		if (!req.token.add) {
			res.json({
				error: "Access denied!",
			});
		} else {
			const data = req.body;
			if (req.file) {
				data.image = req.file.filename || req.body.image;
			}
			product.addProduct(data).then((resolve) => {
				res.json(resolve);
			});
		}
	},
	editProduct: (req, res) => {
		if (!req.token.edit) {
			res.json({
				error: "Access denied!",
			});
		} else {
			const data = req.body;
			if (req.file) {
				data.image = req.file.filename || req.body.image;
			}
			product
				.editProduct(data, req.params.id)
				.then((resolve) => {
					res.json(resolve);
				})
				.catch((reject) => console.log(reject));
		}
	},
	deleteProduct: (req, res) => {
		if (!req.token.delete) {
			res.json({
				error: "Access denied!",
			});
		} else {
			product.deleteProduct(req.body.id).then((resolve) => {
				res.json(resolve);
			});
		}
	},
};
