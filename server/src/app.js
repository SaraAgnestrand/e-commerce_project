const express = require("express");
const productRouter = require("./resources/product/product.router")
//const cors = require("cors");

const app = express();

// app.use(
//     cors({
//         origin: "*",
//     })
// );

app.use(express.json());


app.use((err, req, res, next) => {
    console.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    next(err);
});

//Add routers
app.use("/api/products", productRouter);



module.exports = { app };