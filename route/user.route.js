const express = require("express");
const userrouter = express.Router();
const {userSignup,userLogin,verifyemail,UpdateProfile} = require("../controller/user.controller.js")
const Authtoken = require("../middleware/sessionservice");
const validationSchema = require("../middleware/user.validation");
const validateUser = require("../middleware/validator");

userrouter.post("/signup", validateUser(validationSchema), userSignup);
userrouter.post("/signin", userLogin);
userrouter.get("/verify/email/:token", verifyemail);
userrouter.patch("/upload/profile", Authtoken, UpdateProfile);

module.exports = userrouter;
