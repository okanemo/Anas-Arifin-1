const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
	// const token = req.headers["usertoken"];
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.token = {
			admin: decoded.admin,
			add: decoded.add,
			edit: decoded.edit,
			delete: decoded.delete,
		};
		next();
	} catch (err) {
		console.log(err);
		res.json({
			error: "Access denied!",
		});
	}
};
