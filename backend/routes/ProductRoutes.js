// routes/productRoutes.js
import express from "express";
import Product from "../models/Product.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public: get all products (optionally filter by category via query ?category=Protein)
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Public: get single product by productId
router.get("/:productId", async (req, res) => {
  try {
    const p = await Product.findOne({ productId: req.params.productId });
    if (!p) return res.status(404).json({ msg: "Product not found" });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: create product
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const { productId, name, price, image, category, flavor, weight, description } = req.body;
    if (!productId || !name || price == null) return res.status(400).json({ msg: "productId, name, price required" });

    const exists = await Product.findOne({ productId });
    if (exists) return res.status(400).json({ msg: "productId already exists" });

    const product = new Product({ productId, name, price, image, category, flavor, weight, description });
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: update product
router.put("/:productId", verifyAdmin, async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate({ productId: req.params.productId }, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: "Product not found" });
    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: delete product
router.delete("/:productId", verifyAdmin, async (req, res) => {
  try {
    const removed = await Product.findOneAndDelete({ productId: req.params.productId });
    if (!removed) return res.status(404).json({ msg: "Product not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
