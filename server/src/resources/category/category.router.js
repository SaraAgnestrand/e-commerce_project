const express = require("express")
const { getCategories, getCategoryById } = require("./category.controller");

//Skapar en ExpressRouter
const categoryRouter = express.Router();

//Definierar API-rutter
categoryRouter.get("", getCategories);
categoryRouter.get("/:id", getCategoryById);

//Exporterar Routern
module.exports = categoryRouter;