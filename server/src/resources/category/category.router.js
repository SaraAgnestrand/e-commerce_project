const express = require("express")
const { getCategories, getCategoryById } = require("./category.controller");
const categoryRouter = express.Router();



categoryRouter.get("", getCategories);
categoryRouter.get("/:id", getCategoryById);



module.exports = categoryRouter;