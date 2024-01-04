const express = require("express");
const cookieSession = require("cookie-session");
const productRouter = require("./resources/product/product.router");
const categoryRouter = require("./resources/category/category.router");
const userRouter = require("./resources/user/user.router");
const cors = require("cors");

const app = express();

app.use(
    cors({
        origin: "*",
    })
);

app.use(
    cookieSession({
      name: "session",
      keys: ["aVeryS3cr3tK3y"],
      maxAge: 1000 * 60 * 60 * 24, // 24 Hours
      sameSite: "strict",
      httpOnly: true,
      secure: false,
    })
  );

app.use(express.json());


app.use((err, req, res, next) => {
    console.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    next(err);
});

//Add routers
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);


module.exports = { app };