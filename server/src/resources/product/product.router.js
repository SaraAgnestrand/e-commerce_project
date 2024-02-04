const express = require("express");
const { getProductsByCategory, getProductById, getProducts, deleteProduct, createProduct } = require("./product.controller");

const productRouter = express.Router();

productRouter.get("/byCategory/:name", getProductsByCategory);
productRouter.get("/:id", getProductById);
productRouter.get("", getProducts);
productRouter.delete("/:id", deleteProduct);
productRouter.post("", createProduct);

module.exports = productRouter;

