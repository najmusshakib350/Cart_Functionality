const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const AppError = require("./utils/appError");
const GlobalError = require("./controllers/errorcontroller");
const app = express();
const UserRouter = require("./routes/userrouter");
const ProducetRouter = require("./routes/productroutes");
const CartRouter = require("./routes/cartroutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/user", UserRouter);
app.use("/api/product", ProducetRouter);
app.use("/api/cart", CartRouter);

app.all("*", (req, res, next) => {
  return next(
    new AppError(`Can not find ${req.originalUrl} on this server`, 404)
  );
});
//Second step we will implement global error handling middleware
app.use(GlobalError);

module.exports = app;
