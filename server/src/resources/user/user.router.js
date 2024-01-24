const express = require("express");
const { registerUser, loginUser, logoutUser } = require("./user.controller");
const { UserCreateValidationSchema } = require("./user.model");
const { validate } = require("../../middlewares");

//Skapar Express Router
const userRouter = express.Router();

//Definierar API-Rutter:
userRouter.post("/register", validate(UserCreateValidationSchema), registerUser);
userRouter.post("/loginUser", loginUser);
userRouter.post("/logoutUser", logoutUser);

//Exporterar Routern
module.exports = userRouter;