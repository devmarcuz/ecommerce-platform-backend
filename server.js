const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const connectDB = require("./db/connectDB");
const stripeRoutes = require("./routes/stripeRoutes");
require("dotenv").config({});

connectDB();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(errorHandler);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/carts", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/checkouts", stripeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
