const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./src/routes/userRoute.js");
const port = 3001;

app.use(express.json());
async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/user");
	console.log("connected");
}
main();

app.use("/", router);

app.listen(port, () => console.log(`Example app listening on port ${port}`));
