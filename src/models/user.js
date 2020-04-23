const db = require("../configs/database");

module.exports = {
	getAllUser: () => {
		return new Promise((resolve) => {
			db.query(`SELECT * FROM user WHERE username != 'admin'`, (err, result) => {
				if (err) reject(new Error(err));
				resolve(result);
			});
		});
	},
	getUser: (username) => {
		return new Promise((resolve) => {
			db.query(`SELECT * FROM user WHERE username = '${username}'`, (err, result) => {
				if (err) reject(new Error(err));
				if (result.length > 0) {
					resolve(result[0]);
				} else {
					resolve({ error: "User not found !" });
				}
			});
		});
	},
	editUser: (data, username) => {
		return new Promise((resolve, reject) => {
			db.query(`UPDATE user SET ? WHERE username = '${username}'`, data, (err, result) => {
				if (err) reject(new Error(err));
				resolve(result);
			});
		});
	},
	deleteUser: (username) => {
		return new Promise((resolve, reject) => {
			db.query(`DELETE FROM user WHERE username = '${username}'`, (err, result) => {
				if (err) reject(new Error(err));
				resolve(result);
			});
		});
	},
};
