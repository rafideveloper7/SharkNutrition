import express from "express";
import { createOrder } from "../controllers/orderController.js";
import Order from "../models/Orders.js";
const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Order routes are working!" });
});
router.get("/stats/count", async (req, res) => {
  try {
    const count = await Order.countDocuments();
    console.log(` Total orders: ${count}`);

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
// Create order route
router.post("/", (req, res) => {
  console.log(" POST /api/orders hit");
  createOrder(req, res);
});

export default router;
