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
			product.addProduct(req.body).then((resolve) => {
				console.log("ini : " + req.token.add);
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
			product.editProduct(req.body, req.params.id).then((resolve) => {
				res.json(resolve);
			});
		}
	},
	deleteProduct: (req, res) => {
		console.log(req.token);
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
