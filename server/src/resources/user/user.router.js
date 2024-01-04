const express = require("express");
const { registerUser, loginUser, logoutUser } = require("./user.controller");
const { UserCreateValidationSchema } = require("./user.model");
const { validate } = require("../../middlewares");

const userRouter = express.Router();

userRouter.post("/register", validate(UserCreateValidationSchema), registerUser);
userRouter.post("/loginUser", loginUser);
userRouter.post("/logoutUser", logoutUser);


module.exports = userRouter;