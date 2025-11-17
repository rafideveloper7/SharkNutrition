import express from "express";
import Product from "../models/Product.js";
import { verifyAdmin } from "../middleware/auth.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const router = express.Router();

// ---------------- CLOUDINARY CONFIG ----------------
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY?.trim();
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET?.trim();

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error("Missing Cloudinary credentials!");
} else {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
}

// ---------------- MULTER MEMORY STORAGE ----------------
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

// ---------------- HELPERS ----------------
const uploadToCloudinary = async (buffer, mimetype) => {
  const base64 = buffer.toString("base64");
  const dataUri = `data:${mimetype};base64,${base64}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "products",
  });
  return result;
};

// ---------------- ROUTES ----------------

// Test API
router.get("/test", async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.json({ success: true, totalProducts: count });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET all products
router.get("/", async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const products = await Product.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single product
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id).lean();
    if (!product) product = await Product.findOne({ productId: req.params.id }).lean();
    if (!product) return res.status(404).json({ success: false, error: "Product not found" });
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// CREATE product
router.post("/", verifyAdmin, upload.array("images", 4), async (req, res) => {
  try {
    const { name, category, price, weight, flavor, servings, description } = req.body;
    if (!name || !category || !price) return res.status(400).json({ success: false, error: "Missing required fields" });

    // Upload images
    let galleryUrls = [];
    if (req.files?.length) {
      for (const file of req.files) {
        const uploadResult = await uploadToCloudinary(file.buffer, file.mimetype);
        galleryUrls.push(uploadResult.secure_url);
      }
    }

    const newProduct = new Product({
      productId: `PROD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      category: category.toLowerCase(),
      price: Number(price),
      weight: weight || "",
      flavor: flavor ? JSON.parse(flavor) : [],
      servings: servings ? JSON.parse(servings) : [],
      description: description || "",
      gallery: galleryUrls,
      image: galleryUrls[0] || "",
    });

    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE product
router.put("/:id", verifyAdmin, upload.array("images", 10), async (req, res) => {
  try {
    const { existingGallery, ...data } = req.body;
    let finalGallery = existingGallery ? (Array.isArray(existingGallery) ? existingGallery : [existingGallery]) : [];

    // Upload new images
    if (req.files?.length) {
      for (const file of req.files) {
        const uploadResult = await uploadToCloudinary(file.buffer, file.mimetype);
        finalGallery.push(uploadResult.secure_url);
      }
    }

    data.gallery = finalGallery;
    data.image = finalGallery[0] || "";

    if (data.price) data.price = Number(data.price);
    if (data.category) data.category = data.category.toLowerCase();

    const updated = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!updated) return res.status(404).json({ success: false, error: "Product not found" });

    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE product
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id) || await Product.findOneAndDelete({ productId: req.params.id });
    if (!product) return res.status(404).json({ success: false, error: "Product not found" });

    if (product.image) {
      try {
        const publicId = product.image.split("/").slice(-2).join("/").split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("Cloudinary delete failed:", err);
      }
    }

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
