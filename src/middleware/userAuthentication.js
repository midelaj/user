const jwt = require("jsonwebtoken");
const { secretKey } = require("../controllers/userController");

const userAuthentication = async (req, res, next) => {
	const token = await req.header("Authorization")?.split(" ")[1];
	if (!token) {
		return res.status(401).json({ message: "No token, autherization failed" });
	}
	try {
		const decoded = jwt.verify(token, secretKey);
		req.user = decoded;
		next();
	} catch {
		return res.status(403).json({ message: "Invalid token" });
	}
};

module.exports = userAuthentication;
