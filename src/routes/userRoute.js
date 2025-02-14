const express = require("express");
const router = express.Router();
const userAuthentication = require("../middleware/userAuthentication.js");
const userController = require("../controllers/userController.js");

router.post("/user/register", userController.createUser);
router.post("/user/login", userController.userLogin);
router.post("/user", userAuthentication, userController.searchUser);

module.exports = router;
