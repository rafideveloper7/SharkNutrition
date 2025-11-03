import express from "express";
import Product from "../models/Product.js";
import { verifyAdmin } from "../middleware/auth.js";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.get("/test", async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const sample = await Product.findOne().lean();

    res.json({
      success: true,
      totalProducts: count,
      sample,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/stats/count", async (req, res) => {
  try {
    const count = await Product.countDocuments();
    console.log(`Total products: ${count}`);

    res.json({
      success: true,
      count: count,
    });
  } catch (err) {
    console.error(" Error counting products:", err);
    res.status(500).json({
      error: "Failed to count products",
      message: err.message,
    });
  }
});
router.get("/getAllProducts", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    console.log(` Retrieved all products, count: ${products.length}`);

    res.json({
      success: true,
      message: "All products retrieved successfully",
      products,
    });
  } catch (err) {
    console.error("Error retrieving all products:", err);
    res.status(500).json({
      error: "Failed to retrieve all products",
      message: err.message,
    });
  }
});

//  FILTERED GET (Supports category filter)
// Endpoint: GET /products?category=protein

router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const products = await Product.find(filter)
      .sort({ category: 1, createdAt: -1 })
      .lean();

    console.log(`Found ${products.length} products`);
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({
      error: "Failed to fetch products",
      message: err.message,
    });
  }
});

router.get("/fix-old-images", async (req, res) => {
  try {
    const products = await Product.find({});
    let updated = 0;

    for (let product of products) {
      if (product.image && !product.image.startsWith("/uploads/")) {
        product.image = `/uploads/${product.image}`;
        await product.save();
        updated++;
      }
    }

    res.json({
      success: true,
      message: `Updated ${updated} products`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  GET SINGLE PRODUCT BY ID or productId
// Endpoint: GET /products/:id

router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id).lean();

    if (!product) {
      product = await Product.findOne({ productId: req.params.id }).lean();
    }

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json(product);
  } catch (err) {
    console.error(" Error fetching product:", err);
    res.status(500).json({
      error: "Failed to fetch product",
      message: err.message,
    });
  }
});

//  CREATE NEW PRODUCT (Admin only)
// Endpoint: POST /products

// Create product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, category, price, weight, flavor } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const productId = `PROD-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const newProduct = new Product({
      productId,
      name,
      category,
      price: Number(price),
      weight,
      flavor,
      image,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(" Error creating product:", err);
    res.status(500).json({ error: err.message });
  }
});

//  UPDATE PRODUCT (Admin only)
// Endpoint: PUT /products/:id

// Update product route
router.put("/:id", verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    let updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      updated = await Product.findOneAndUpdate(
        { productId: req.params.id },
        updateData,
        { new: true, runValidators: true }
      );
    }

    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ success: true, product: updated });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to update product", message: err.message });
  }
});

//  DELETE PRODUCT (Admin only)
// Endpoint: DELETE /products/:id

router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    let removed = await Product.findByIdAndDelete(req.params.id);

    if (!removed) {
      removed = await Product.findOneAndDelete({ productId: req.params.id });
    }

    if (!removed) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    console.log(" Deleted product:", removed.name);
    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error(" Error deleting product:", err);
    res.status(500).json({
      error: "Failed to delete product",
      message: err.message,
    });
  }
});

export default router;
