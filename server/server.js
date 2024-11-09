require('dotenv').config();
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
const bugReportRoutes = require("./routes/bugReportRoutes");
const cleanupDeletedProducts = require('./utils/cartCleanup');

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
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
app.use(`${config.api.prefix}/bugs`, bugReportRoutes);

app.listen(config.server.port, () => {
  console.log(`Server is Listening on Port ${config.server.port}`);
});

// Run cleanup daily at midnight
const scheduleCartCleanup = () => {
    const now = new Date();
    const night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // tomorrow
        0, 0, 0 // midnight
    );
    const timeToMidnight = night.getTime() - now.getTime();

    setTimeout(() => {
        cleanupDeletedProducts();
        // Schedule next cleanup
        setInterval(cleanupDeletedProducts, 24 * 60 * 60 * 1000);
    }, timeToMidnight);
};

scheduleCartCleanup();
