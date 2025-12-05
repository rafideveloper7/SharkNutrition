// server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";

// Import routes
import adminRoutes from "./routes/adminRoute.js";
import userRoutes from "./routes/userRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import contactRoutes from "./routes/ContactRoute.js";
import couponRoutes from "./routes/couponRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

// =============== GLOBAL DB CONNECTION ===============
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log(" MongoDB connected");
  } catch (err) {
    console.error(" MongoDB connection failed:", err);
    throw err;
  }
};

// =============== EXPRESS APP ===============
const app = express();

// =============== MIDDLEWARE ===============
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sharknutritionpk.store"
    ,
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});





// =============== ROUTES ===============
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/users", userRoutes); // optional, can remove if not needed
app.use("/api/orders", orderRoutes);
app.use("/export", exportRoutes);
app.use("/products", productRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/reviews", reviewRoutes);
// Test route
app.get("/test", async (req, res) => {
  try {
    await connectDB();
    res.json({
      message: "Server is working!",
      routes: ["GET /test", "POST /api/orders", "GET /api/orders/test"],
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to Shark Nutrition API");
});

// 404 handler
app.use((req, res) => {
  console.log(` 404 - Route not found: ${req.method} ${req.url}`);
  res
    .status(404)
    .json({ error: "Route not found", method: req.method, url: req.url });
});

// =============== START SERVER ===============
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
      console.log(`Test URL: http://localhost:${PORT}/test`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
