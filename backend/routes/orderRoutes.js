import express from "express";
import { createOrder } from "../controllers/orderController.js";
import Order from "../models/Orders.js";
const router = express.Router();
import { verifyAdmin } from "../middleware/auth.js";
// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Order routes are working!" });
});
router.get("/stats/count", async (req, res) => {
  try {
    const count = await Order.countDocuments();
   

    res.json({
      success: true,
      count: count,
    });
  } catch (err) {
    console.error(" Error counting orders:", err);
    res.status(500).json({
      error: "Failed to count orders",
      message: err.message,
    });
  }
});
// Get all orders
router.get("/", verifyAdmin,async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Latest first
    res.json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({
      success: false,
      message: "Failed to get orders",
      error: err.message,
    });
  }
});

// Create order route
router.post("/", (req, res) => {

  createOrder(req, res);
});

export default router;
