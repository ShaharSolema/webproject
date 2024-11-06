const express = require("express");
const cors = require("cors"); //ADD LATER FOR SECURITY MEASURES
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const config = require("./config/config");
const authenticate = require("./Middleware/authMiddleware");
const authRoute = require("./routes/authRoute");
const cookieParser = require("cookie-parser");
const cartRoutes = require("./routes/cartRoutes");
const statisticsRoutes = require ("./routes/statisticsRoutes")
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

connectDB();

app.use(`${config.api.prefix}/auth`, authRoute);
app.use(`${config.api.prefix}/users`, userRoutes);
app.use(`${config.api.prefix}/products`, productRoutes);
app.use(`${config.api.prefix}/carts`, authenticate, cartRoutes);
app.use(`${config.api.prefix}/statistics`, authenticate, statisticsRoutes);
app.use(`${config.api.prefix}/orders`,authenticate, orderRoutes);

app.listen(config.server.port, () => {
  console.log(`Server is Listening on Port ${config.server.port}`);
});
