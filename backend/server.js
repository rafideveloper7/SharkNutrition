import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import cookieParser from "cookie-parser";
// Import routes
import adminRoutes from "./routes/adminRoute.js";
import userRoutes from "./routes/userRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import contactRoutes from "./routes/ContactRoute.js";
const app = express();

// =============== MIDDLEWARE ===============
app.use(
  cors({
    origin: "*", // frontend origin
    credentials: true, // allow cookies
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// Request logging middleware
app.use((req, res, next) => {
  console.log(` ${req.method} ${req.url}`);
  next();
});

// Directory setup
const __dirname = path.resolve();
const EXPORT_DIR = path.join(__dirname, "exports");
if (!fs.existsSync(EXPORT_DIR)) fs.mkdirSync(EXPORT_DIR);

// =============== MONGODB ===============
const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/sharkdb";
mongoose
  .connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB error:", err));

// =============== ROUTES ===============

app.use("/api/admin", adminRoutes);
app.use("/users", userRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/export", exportRoutes);
app.use("/products", productRoutes);
app.use("/api/contact", contactRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Test route
app.get("/test", (req, res) => {
  res.json({
    message: "Server is working!",
    routes: ["GET /test", "POST /api/orders", "GET /api/orders/test"],
  });
});

app.use((req, res) => {
  console.log(` 404 - Route not found: ${req.method} ${req.url}`);
  res
    .status(404)
    .json({ error: "Route not found", method: req.method, url: req.url });
});

// =============== SERVER START ===============
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(`Test URL: http://localhost:${PORT}/test`);
  console.log(`Order test: http://localhost:${PORT}/api/orders/test`);
});
