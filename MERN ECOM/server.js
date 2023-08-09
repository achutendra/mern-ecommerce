import express from "express"; // in ES we use type: module & import statements
import colors from "colors"; // in type: commonjs we use const express = require('express')
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";
import path from "path";

// configure env
dotenv.config();

// Database config
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

// rest api
// initial route during development
// app.get('/', (req, res) => {
//     res.send("<h1>Welcome to My Ecommerce App</h1>")
// });
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// PORT
const PORT = process.env.PORT || 8080;

// run server
app.listen(PORT, () => {
  // console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
});
