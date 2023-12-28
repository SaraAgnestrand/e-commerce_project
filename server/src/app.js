const express = require("express");
const cors = require("cors");

//const { productRouter } = require("./resources/product/product.router");

const app = express();
app.use(express.json());

//Add routers
app.use("/api/products", productRouter);



module.exports = { app };