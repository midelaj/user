const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey =
	"985ac59eed6d66cd363ba2db4b9efdc83c523576c2e2f9f1d3e5cfb54d16195c";

const createUser = async (req, res) => {
	const password = req.body.password;

	const hashPassword = await bcrypt.hash(password, 10);
	const user = new User({
		userName: req.body.userName,
		fullName: req.body.fullName,
		email: req.body.email,
		password: hashPassword,
		dateOfBirth: req.body.DOB,
		country: req.body.country,
	});
	const newUser = await user.save();
	console.log(newUser);
	res
		.status(201)
		.json({ message: "New user created successfully", user: newUser });
};

const userLogin = async (req, res) => {
	const { email, userName, password } = req.body;
	let user;
	if (email) {
		user = await User.findOne({ email });
	} else if (userName) {
		user = await User.findOne({ userName });
	}
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		return res.status(401).json({ message: "Invalid password" });
	}
	const token = jwt.sign(
		{ userId: user._id, userName: user.userName },
		secretKey,
		{ expiresIn: "1h" },
	);
	return res.status(200).json({ message: "Login successful", user, token });
};

const searchUser = async (req, res) => {
	const { email, userName } = req.body;
	let user;
	if (email) {
		user = await User.findOne({ email });
	} else if (userName) {
		user = await User.findOne({ userName });
	}
	if (!user) {
		return res.status(404).json({ message: "user not found" });
	}
	return res.status(200).json({ message: "user found", user });
};

module.exports = { createUser, userLogin, searchUser, secretKey };
