const express = require("express");
const { getProductsByCategory, getProductById, getProducts, deleteProduct, createProduct, updateProduct } = require("./product.controller");
const productRouter = express.Router();

productRouter.get("/byCategory/:name", getProductsByCategory);
productRouter.get("/:id", getProductById);
productRouter.get("", getProducts);
productRouter.delete("/:id", deleteProduct); 
productRouter.post("", createProduct);
// productRouter.put("/:id", updateProduct);

// productRouter.get("", async (req, res) => {
//     console.log("Route hit!");
//     try {
//         const products = await getProducts(req, res);
//         res.status(200).json(products);
//     } catch (error) {
//         console.log("Error in router:", error);
//         res.status(400).json(error);
//     }
// });

module.exports = productRouter; 

//createproduct ha med userIsLoggedIn, userLoggedInAsAdmin, validate(productJoiSchema)
// På deleteProduct Lägg till userIsLoggedIn, userLoggedInAsAdmin
//i updateProduct lägg till userIsLoggedIn, userLoggedInAsAdmin, validate(productJoiSchema),