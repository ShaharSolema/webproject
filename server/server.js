const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const User = require("./models/User");
connectDB();

app.listen(3000, () => {
  console.log("Server is Listening on Port 3000");
});
