

import express from "express";
import { verifyAdmin } from "../middleware/auth.js";
import User from "../models/User.js";
import Orders from "../models/Orders.js";
import Product from "../models/Product.js";

const router = express.Router();

// GET all dashboard stats (for admin)
router.get("/", verifyAdmin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalOrders = await Orders.countDocuments();
        const totalProducts = await Product.countDocuments();

        res.json({ totalUsers, totalOrders, totalProducts });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

export default router;