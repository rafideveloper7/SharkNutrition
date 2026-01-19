// ================= LOAD ENV =================
import dotenv from "dotenv";
dotenv.config();

// ================= IMPORTS =================
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";

// ================= ROUTES =================
import adminRoutes from "./routes/adminRoute.js";
import userRoutes from "./routes/userRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import contactRoutes from "./routes/ContactRoute.js";
import couponRoutes from "./routes/couponRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

// ================= DB CONNECTION =================
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed", err.message);
    process.exit(1);
  }
};

// ================= EXPRESS APP =================
const app = express();

// ================= CORS CONFIG =================
const allowedOrigins = [
  "http://localhost:5173",
  "https://sharknutritionpk.store",
  "https://www.sharknutritionpk.store",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked"));
      }
    },
    credentials: true,
  }),
);

// ================= MIDDLEWARE =================
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ================= REQUEST LOGGER =================
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ================= ROUTES =================
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/export", exportRoutes);
app.use("/products", productRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/reviews", reviewRoutes);

// ================= TEST ROUTE =================
app.get("/test", async (req, res) => {
  await connectDB();
  res.json({ message: "Server working fine" });
});

// ================= ROOT =================
app.get("/", (req, res) => {
  res.send("Shark Nutrition API is running");
});

// ================= 404 =================
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();


