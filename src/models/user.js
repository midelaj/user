const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		require: true,
	},
	fullName: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	dateOfBirth: {
		type: Date,
		require: true,
	},
	country: {
		type: String,
		requir: true,
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
