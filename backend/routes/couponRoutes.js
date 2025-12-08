// backend/routes/couponRoutes.js
import express from "express";
import mongoose from "mongoose";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// ---------------- COUPON MODEL ----------------
const CouponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountValue: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    usageLimit: { type: Number, default: 0 },
    usedCount: { type: Number, default: 0 },
    minPurchase: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", CouponSchema);

// ---------------- CONTROLLERS ----------------

// Create coupon (Admin)
const createCoupon = async (req, res) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      expiryDate,
      usageLimit,
      minPurchase,
    } = req.body;

    if (!code || !discountType || !discountValue || !expiryDate) {
      return res
        .status(400)
        .json({ success: false, error: "All required fields must be filled" });
    }

    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing)
      return res
        .status(400)
        .json({ success: false, error: "Coupon code already exists" });

    const coupon = new Coupon({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      expiryDate,
      usageLimit: usageLimit || 0,
      minPurchase: minPurchase || 0,
    });

    await coupon.save();
    res.status(201).json({ success: true, coupon });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get all coupons (Admin)
const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json({ success: true, coupons });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Delete coupon (Admin)
const deleteCoupon = async (req, res) => {
  try {
    const deleted = await Coupon.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, error: "Coupon not found" });
    res.json({ success: true, message: "Coupon deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Apply coupon (User)
const applyCoupon = async (req, res) => {
  try {
    const { code, cartTotal } = req.body;
    console.log("hellow");

    if (!code || !cartTotal)
      return res
        .status(400)
        .json({ success: false, error: "Code and cartTotal required" });

    const cleanCode = code.trim().toUpperCase();

    const coupon = await Coupon.findOne({ code: cleanCode });
    if (!coupon)
      return res
        .status(404)
        .json({ success: false, error: "Invalid coupon code!" });

    if (coupon.expiryDate < new Date())
      return res.status(400).json({ success: false, error: "Coupon expired" });
    if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit)
      return res
        .status(400)
        .json({ success: false, error: "Coupon usage limit reached" });
    if (cartTotal < coupon.minPurchase)
      return res
        .status(400)
        .json({
          success: false,
          error: `Minimum purchase ${coupon.minPurchase} required`,
        });

    let discount = 0;
    if (coupon.discountType === "percentage")
      discount = (cartTotal * coupon.discountValue) / 100;
    else discount = coupon.discountValue;

    if (discount > cartTotal) discount = cartTotal;

    res.json({
      success: true,
      discount,
      discountedTotal: cartTotal - discount,
      couponCode: coupon.code,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// ---------------- ROUTES ----------------
router.post("/", verifyAdmin, createCoupon);
router.get("/", verifyAdmin, getAllCoupons);
router.delete("/:id", verifyAdmin, deleteCoupon);
router.post("/apply", applyCoupon);

export default router;
