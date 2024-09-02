const express = require("express");
const cors = require("cors"); //ADD LATER FOR SECURITY MEASURES
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const config = require("./config/config");

const app = express();

app.use(express.json());


connectDB();

app.use(config.api.prefix, userRoutes);
app.use(config.api.prefix, productRoutes);

app.listen(config.server.port, () => {
  console.log(`Server is Listening on Port ${config.server.port}`);
});

