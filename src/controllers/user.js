const user = require("../models/user");

module.exports = {
	getAllUser: (req, res) => {
		user.getAllUser().then((resolve) => {
			if (!req.token.admin) {
				res.json({
					error: "Access denied!",
				});
			}
			res.json(resolve);
		});
	},
	getUser: (req, res) => {
		user.getUser(req.params.username).then((resolve) => {
			res.json(resolve);
		});
	},
	editUser: (req, res) => {
		const data = req.body;
		if (req.token.username != req.params.username) {
			res.json({
				error: "Access denied!",
			});
		}
		if (!req.token.admin) {
			delete data.priv_add;
			delete data.priv_edit;
			delete data.priv_delete;
		}
		user.editUser(data, req.params.username).then((resolve) => {
			res.json(resolve);
		});
	},
	deleteUser: (req, res) => {
		if (!req.token.admin) {
			res.json({
				error: "Access denied!",
			});
		}
		user.removeUser(req.body.username).then((resolve) => {
			res.json(resolve);
		});
	},
};
