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
		product.addProduct(req.body).then((resolve) => {
			if (!req.token.add) {
				res.json({
					error: "Access denied!",
				});
			}
			res.json(resolve);
		});
	},
	editProduct: (req, res) => {
		product.editProduct(req.body, req.params.id).then((resolve) => {
			if (!req.token.edit) {
				res.json({
					error: "Access denied!",
				});
			}
			res.json(resolve);
		});
	},
	deleteProduct: (req, res) => {
		product.deleteProduct(req.body.id).then((resolve) => {
			if (!req.token.delete) {
				res.json({
					error: "Access denied!",
				});
			}
			res.json(resolve);
		});
	},
};
