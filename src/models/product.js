const db = require("../configs/database");

module.exports = {
	getAllProduct: () => {
		return new Promise((resolve) => {
			db.query(`SELECT * FROM product`, (err, result) => {
				if (err) reject(new Error(err));
				resolve(result);
			});
		});
	},
	getProduct: (id) => {
		return new Promise((resolve) => {
			db.query(`SELECT * FROM product WHERE id = '${id}'`, (err, result) => {
				if (err) reject(new Error(err));
				if (result.length > 0) {
					resolve(result);
				} else {
					resolve({ error: "Product not found !" });
				}
			});
		});
	},
	addProduct: (data) => {
		return new Promise((resolve, reject) => {
			db.query(`INSERT INTO product SET ?`, data, (err, result) => {
				if (err) reject(new Error(err));
				resolve(result);
			});
		});
	},
	editProduct: (data, id) => {
		return new Promise((resolve, reject) => {
			db.query(`UPDATE product SET ? WHERE id = '${id}'`, data, (err, result) => {
				if (err) reject(new Error(err));
				resolve(result);
			});
		});
	},
	deleteProduct: (id) => {
		return new Promise((resolve, reject) => {
			db.query(`DELETE FROM product WHERE id = '${id}'`, (err, result) => {
				if (err) reject(new Error(err));
				resolve(result);
			});
		});
	},
};
