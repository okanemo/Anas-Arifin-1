const db = require("../configs/database");
const bcrypt = require("bcryptjs");

function hash(password) {
	return new Promise((resolve) => {
		bcrypt.hash(password, 10, function (err, hash) {
			if (err) throw err;
			resolve(hash);
		});
	});
}

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
	editUser: async (data, username) => {
		const newData = { ...data };
		if (data.password) {
			newData.password = await hash(data.password);
		}
		return new Promise((resolve, reject) => {
			db.query(`UPDATE user SET ? WHERE username = '${username}'`, newData, (err, result) => {
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
