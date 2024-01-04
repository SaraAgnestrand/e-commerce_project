const express = require("express");
const { getProductsByCategory, getProductById, getProducts, deleteProduct, createProduct, updateProduct } = require("./product.controller");
const productRouter = express.Router();

productRouter.get("/byCategory/:name", getProductsByCategory);
productRouter.get("/:id", getProductById);
productRouter.get("", getProducts);
productRouter.delete("/:id", deleteProduct); 
productRouter.post("", createProduct);
// productRouter.put("/:id", updateProduct);


module.exports = productRouter; 

//createproduct ha med userIsLoggedIn, userLoggedInAsAdmin, validate(productJoiSchema)
// På deleteProduct Lägg till userIsLoggedIn, userLoggedInAsAdmin
//i updateProduct lägg till userIsLoggedIn, userLoggedInAsAdmin, validate(productJoiSchema),