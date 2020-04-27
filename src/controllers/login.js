const login = require("../models/login");

module.exports = {
	login: (req, res) => {
		login
			.login(req.body.username, req.body.password)
			.then((resolve) => {
				req.session.token = resolve.token;
				res.json(resolve);
			})
			.catch((reject) => {
				res.json({ error: reject });
			});
	},
	register: (req, res) => {
		login
			.register(req.body.username, req.body.password)
			.then((resolve) => {
				res.json(resolve);
			})
			.catch((reject) => {
				res.json({ error: reject });
			});
	},
	verify: (req, res) => {
		if (req.token) {
			login
				.login(req.body.username, req.body.password, req.token.username)
				.then((resolve) => {
					// req.session.token = "berubah lu";
					res.json(resolve);
				})
				.catch((reject) => {
					res.json({ error: reject });
				});
		} else {
			res.json({ error: "Token invalid!" });
		}
	},
	logout: (req, res) => {
		req.session = null;
		res.json("Logout success!");
	},
};
