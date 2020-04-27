const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
	const token = req.headers["authorization"] || req.session.token;
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.token = decoded;
		next();
	} catch (err) {
		console.log(err);
		res.json({
			error: "Access denied!",
		});
	}
};
