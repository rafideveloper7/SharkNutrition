import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dbConnect from "../utils/db.js";

import adminRoutes from "../routes/adminRoute.js";
import userRoutes from "../routes/userRoute.js";
import orderRoutes from "../routes/orderRoutes.js";
import exportRoutes from "../routes/exportRoutes.js";
import productRoutes from "../routes/ProductRoutes.js";
import contactRoutes from "../routes/ContactRoute.js";
import couponRoutes from "../routes/couponRoutes.js";

const app = express();

app.use(cors({
  origin: [
    "https://sharknutritionpk.store",
    "http://localhost:5173",
  ],
  credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect DB
await dbConnect();

// set up routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/export", exportRoutes);
app.use("/products", productRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/coupons", couponRoutes);

// test route
app.get("/test", (req, res) => {
  res.json({ message: "Serverless API is working" });
});

export default serverless(app);
