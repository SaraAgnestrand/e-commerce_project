const { ProductModel } = require("./product.model");
//getProducts
 const getProducts = async(req, res) => {
    console.log("Controller is hit!")
    try{
        const products = await ProductModel.find();
        console.log("Products from DB:", products);
        res.status(200).json(products);
    } catch(error){
        console.log("Error in controller:", error.message);
        res.status(400).json(error);
        }   
};


//getProductByCategory
//getProductById
//deleteProduct
//createProduct
//updateProduct

module.exports = { getProducts };