// api/index.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Import your routes
import adminRoutes from "../routes/adminRoute.js";
import userRoutes from "../routes/userRoute.js";
import orderRoutes from "../routes/orderRoutes.js";
import exportRoutes from "../routes/exportRoutes.js";
import productRoutes from "../routes/ProductRoutes.js";
import contactRoutes from "../routes/ContactRoute.js";
import couponRoutes from "../routes/couponRoutes.js";

const app = express();

// Middleware
app.use(cors({ origin: [process.env.FRONT_END_URL || "*"], credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// =============== ROUTES ===============
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/users", userRoutes); // optional
app.use("/api/orders", orderRoutes);
app.use("/export", exportRoutes);
app.use("/products", productRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/coupons", couponRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Shark Nutrition API" });
});

// Test route
app.get("/test", async (req, res) => {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    res.json({ message: "Server is working!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found", method: req.method, url: req.url });
});

// Export app for Vercel
export default app;
