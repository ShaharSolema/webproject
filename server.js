const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./Config/db");
const Product = require("./Models/Product");
const User = require("./Models/User");
connectDB();

app.listen(3000, () => {
  console.log("Server is Listening on Port 3000");
});
