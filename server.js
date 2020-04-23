const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const helmet = require("helmet");
const app = express();
const router = require("./src/routes/index");
const cors = require("cors");
const nocache = require("nocache");
require("dotenv").config();

app.use(cors({ credentials: true, origin: true }));
app.use(helmet());
app.use(
	cookieSession({
		name: "session",
		secret: "dwaho122kv91xGFHnvj",
		maxAge: 24 * 60 * 60 * 1000, // 24 hours
		httpOnly: true,
	}),
);
app.use((req, res, next) => {
	req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge;
	req.session.nowInMinutes = Math.floor(Date.now() / 3600e3);
	next();
});
app.use("/public", express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", router);
app.use(nocache());

app.listen(process.env.SERVER_PORT, () => {
	console.log(`\n Server is running on port ${process.env.SERVER_PORT} ...\n`);
});
