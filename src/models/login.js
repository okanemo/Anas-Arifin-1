const db = require("../configs/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { json } = require("body-parser");
require("dotenv").config();

function checkUsername(username) {
	return new Promise((resolve) => {
		db.query(`SELECT * FROM user WHERE username = '${username}'`, (err, data) => {
			if (err) throw err;
			resolve(data[0]);
		});
	});
}
function checkPassword(username, password) {
	return new Promise((resolve) => {
		db.query(`SELECT password FROM user WHERE username = '${username}'`, (err, data) => {
			if (err) throw err;
			bcrypt.compare(password, data[0].password, (err, result) => {
				if (result) {
					resolve(true);
				} else {
					resolve(false);
				}
			});
		});
	});
}
function hash(password) {
	return new Promise((resolve) => {
		bcrypt.hash(password, 10, function (err, hash) {
			if (err) throw err;
			resolve(hash);
		});
	});
}

module.exports = {
	login: async (username, password, verifyUsername) => {
		// check if username exist or not
		console.log(verifyUsername);
		const userData = await checkUsername(username);
		if (userData) {
			if (verifyUsername) {
				return new Promise((resolve) => {
					resolve({
						...userData,
						token: jwt.sign({ username: username, admin: username === "admin" ? true : false }, process.env.SECRET_KEY, {
							expiresIn: "365d",
						}),
					});
				});
			} else {
				// check if password is match with username
				if (await checkPassword(username, password)) {
					return new Promise((resolve) => {
						resolve({
							...userData,
							token: jwt.sign({ username: username, admin: username === "admin" ? true : false }, process.env.SECRET_KEY, {
								expiresIn: "365d",
							}),
						});
					});
				}
			}
		}
		return new Promise((resolve, reject) => {
			reject("Username and password incorrect!");
		});
	},
	register: (username, password) => {
		return new Promise(async (resolve, reject) => {
			const regex = /[a-z0-9]/gi;
			if (username.length >= 4 && username.length <= 12 && regex.test(username)) {
				if (password.length >= 6 && regex.test(password)) {
					const passwordHash = await hash(password);
					if ((await checkUsername(username)) == undefined) {
						db.query(`INSERT INTO user SET username = '${username}', password = '${passwordHash}'`, (err, result) => {
							if (err) throw err;
							resolve(result);
						});
					} else {
						reject("Username has already been taken!");
					}
				} else {
					reject("Password must have min 6 character and not included special char!");
				}
			} else {
				reject("Username must contain 4 - 12 character and not included special char!");
			}
		});
	},
};
