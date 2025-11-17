import express from "express";
import { verifyAdmin } from "../middleware/auth.js";
import User from "../models/User.js";
import Orders from "../models/Orders.js";
import Product from "../models/Product.js";

const router = express.Router();

// GET dashboard stats (admin only)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    // Count documents
    const [totalUsers, totalOrders, totalProducts] = await Promise.all([
      User.countDocuments(),
      Orders.countDocuments(),
      Product.countDocuments(),
    ]);

    res.json({ totalUsers, totalOrders, totalProducts });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
