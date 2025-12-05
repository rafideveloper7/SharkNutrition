import express from "express";
import { verifyAdmin } from "../middleware/auth.js";
import Orders from "../models/Orders.js";

const router = express.Router();

// GET all orders (for admin)
router.get("/", verifyAdmin, async (req, res) => {
    try {
        const orders = await Orders.find().sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// DELETE an order (for admin)
router.delete("/:id", verifyAdmin, async (req, res) => {
    try {
        const order = await Orders.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

export default router;