import express from "express";
import Product from "../models/Product.js";
import { verifyAdmin } from "../middleware/auth.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { Readable } from "stream";

const router = express.Router();

// ---------------- CLOUDINARY CONFIG ----------------

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY?.trim();
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET?.trim();

// Verify all Cloudinary credentials are present
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error("Missing Cloudinary credentials!");
  console.error({
    cloud_name: !!CLOUDINARY_CLOUD_NAME,
    api_key: !!CLOUDINARY_API_KEY,
    api_secret: !!CLOUDINARY_API_SECRET,
  });
} else {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    signature_algorithm: "sha256",
  });
  console.log(" Cloudinary configured successfully");
  console.log(" Cloudinary config check:", {
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY
      ? `${CLOUDINARY_API_KEY.substring(0, 4)}...`
      : "missing",
    api_secret: CLOUDINARY_API_SECRET
      ? `${CLOUDINARY_API_SECRET.substring(0, 4)}...`
      : "missing",
  });
}

// ---------------- MULTER MEMORY STORAGE ----------------
const storage = multer.memoryStorage();

// ---------------- MULTER ----------------
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter: (req, file, cb) => {
    console.log("File filter:", file.mimetype);
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// Helper function to upload to Cloudinary using DIRECT HTTP request
// This completely bypasses SDK signature generation
const uploadToCloudinary = async (buffer, mimetype) => {
  try {
    console.log(" Uploading via direct HTTP request with unsigned preset...");

    // Convert buffer to base64
    const base64 = buffer.toString("base64");
    const dataUri = `data:${mimetype};base64,${base64}`;

    // Create FormData for direct HTTP upload
    const formData = new URLSearchParams();
    formData.append("file", dataUri);
    formData.append("upload_preset", "ml_default"); // Your unsigned preset
    formData.append("folder", "products"); // Add folder directly

    // Direct HTTP POST to Cloudinary upload endpoint
    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || `Upload failed: ${response.statusText}`
      );
    }

    const result = await response.json();
    console.log("Upload successful via direct HTTP!");

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
      ...result,
    };
  } catch (error) {
    console.error(" Direct HTTP upload failed:", error.message);

    // Fallback: Try with SDK but without API secret
    console.log(" Fallback: Trying SDK without API secret...");
    try {
      // Save and temporarily remove API secret
      const originalConfig = cloudinary.config();
      cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        // NO api_secret
      });

      const base64 = buffer.toString("base64");
      const dataUri = `data:${mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataUri, {
        upload_preset: "ml_default",
      });

      // Restore config
      cloudinary.config(originalConfig);

      // Move to products folder
      if (result.public_id && !result.public_id.includes("products/")) {
        try {
          const newPublicId = `products/${result.public_id}`;
          await cloudinary.uploader.rename(result.public_id, newPublicId);
          result.secure_url = result.secure_url.replace(
            result.public_id,
            newPublicId
          );
          result.public_id = newPublicId;
        } catch (renameErr) {
          console.log(" Upload succeeded but couldn't move to folder");
        }
      }

      return result;
    } catch (fallbackError) {
      console.error(" Fallback also failed:", fallbackError.message);
      throw fallbackError;
    }
  }
};

console.log(" Multer memory storage configured successfully");

// ---------------- ERROR HANDLER FOR MULTER ----------------
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        error: "File too large. Maximum size is 5MB",
      });
    }
    return res.status(400).json({
      success: false,
      error: `Upload error: ${err.message}`,
    });
  }
  next(err);
};
// Test Cloudinary connection and verify API secret
router.get("/cloudinary-test", async (req, res) => {
  try {
    // Check if credentials are loaded
    const hasCredentials = !!(
      CLOUDINARY_CLOUD_NAME &&
      CLOUDINARY_API_KEY &&
      CLOUDINARY_API_SECRET
    );

    if (!hasCredentials) {
      return res.json({
        success: false,
        error: "Missing Cloudinary credentials",
        check: {
          cloud_name: !!CLOUDINARY_CLOUD_NAME,
          api_key: !!CLOUDINARY_API_KEY,
          api_secret: !!CLOUDINARY_API_SECRET,
        },
      });
    }

    // Test signature generation
    const testParams = {
      folder: "test",
      timestamp: Math.round(Date.now() / 1000),
    };

    const signature = cloudinary.utils.api_sign_request(
      testParams,
      CLOUDINARY_API_SECRET
    );

    // Simple upload test
    const result = await cloudinary.uploader.upload(
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PC9zdmc+",
      { folder: "test" }
    );

    res.json({
      success: true,
      result,
      signatureTest: {
        params: testParams,
        signature: signature.substring(0, 10) + "...",
        secretLength: CLOUDINARY_API_SECRET.length,
      },
    });
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
      details: err,
      apiSecretInfo: {
        exists: !!CLOUDINARY_API_SECRET,
        length: CLOUDINARY_API_SECRET?.length || 0,
        firstChars: CLOUDINARY_API_SECRET?.substring(0, 4) || "N/A",
      },
    });
  }
});

// ---------------- TEST ROUTE ----------------
router.get("/test", async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const sample = await Product.findOne().lean();

    res.json({
      success: true,
      message: "Products API is working",
      totalProducts: count,
      sample,
      env: {
        cloudinary: !!(
          process.env.CLOUDINARY_CLOUD_NAME &&
          process.env.CLOUDINARY_API_KEY &&
          process.env.CLOUDINARY_API_SECRET
        ),
        jwt: !!process.env.JWT_SECRET,
        mongo: !!process.env.MONGO_URI,
      },
    });
  } catch (err) {
    console.error("Test route error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- STATS COUNT ----------------
router.get("/stats/count", async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.json({ success: true, count });
  } catch (err) {
    console.error("Error counting products:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- GET ALL PRODUCTS ----------------
router.get("/getAllProducts", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    res.json({ success: true, products });
  } catch (err) {
    console.error("Error retrieving all products:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------- FILTERED GET ----------------
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const products = await Product.find(filter)
      .sort({ category: 1, createdAt: -1 })
      .lean();

    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- GET SINGLE PRODUCT ----------------
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id).lean();

    if (!product) {
      product = await Product.findOne({ productId: req.params.id }).lean();
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    res.json({ success: true, product });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- CREATE PRODUCT ----------------
// POST /products → Add Product
router.post(
  "/",
  verifyAdmin,
  (req, res, next) => {
    // Multiple images for gallery
    upload.array("images", 4)(req, res, (err) => {
      if (err) {
        console.error(" Multer error:", err);
        return res.status(400).json({ success: false, error: err.message });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      const {
        name,
        category,
        price,
        weight,
        flavor,
        servings,
        description,
        quantity,
      } = req.body;

      if (!name || !category || !price) {
        return res.status(400).json({
          success: false,
          error: "Name, category, and price are required",
        });
      }

      const numPrice = Number(price);
      if (isNaN(numPrice) || numPrice <= 0) {
        return res.status(400).json({
          success: false,
          error: "Price must be a positive number",
        });
      }

      const cleanCategory = category.toLowerCase().trim();
      const validCategories = [
        "protein",
        "creatine",
        "preworkout",
        "weightgainer",
        "vitamins and minerals",
        "amino acid",
      ];
      if (!validCategories.includes(cleanCategory)) {
        return res.status(400).json({
          success: false,
          error: `Invalid category. Must be one of: ${validCategories.join(
            ", "
          )}`,
        });
      }

      // Upload multiple images to Cloudinary
      let galleryUrls = [];
      if (req.files && req.files.length > 0) {
        for (let file of req.files) {
          const uploadResult = await uploadToCloudinary(
            file.buffer,
            file.mimetype
          );
          galleryUrls.push(uploadResult.secure_url);
        }
      }

      const newProduct = new Product({
        productId: `PROD-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        name: name.trim(),
        category: cleanCategory,
        price: numPrice,
        quantity: Number(quantity) || 0,
        weight: weight?.trim() || "",
        flavor: flavor ? JSON.parse(flavor) : [],
        servings: servings ? JSON.parse(servings) : [],
        description: description?.trim() || "",
        gallery: galleryUrls,
        image: galleryUrls[0] || "/images/placeholder.png", // fallback main image
      });

      await newProduct.save();

      res.status(201).json({
        success: true,
        message: "Product added successfully",
        product: newProduct,
      });
    } catch (err) {
      console.error(" POST /products ERROR:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

// ---------------- UPDATE PRODUCT ----------------
router.put(
  "/:id",
  verifyAdmin,
  (req, res, next) => {
    upload.array("images", 10)(req, res, (err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      const { existingGallery, ...otherBodyData } = req.body;
      const updateData = { ...otherBodyData };
      let finalGallery = [];

      // Parse JSON arrays
      if (updateData.flavor) updateData.flavor = JSON.parse(updateData.flavor);
      if (updateData.servings)
        updateData.servings = JSON.parse(updateData.servings);

      // 1. Keep existing images that were sent back from the frontend.
      // 'existingGallery[]' key from FormData becomes 'existingGallery' in req.body.
      if (existingGallery) {
        finalGallery = Array.isArray(existingGallery)
          ? existingGallery
          : [existingGallery];
      }

      // 2. Upload new images and add them to the gallery
      if (req.files && req.files.length > 0) {
        for (let file of req.files) {
          const uploadResult = await uploadToCloudinary(
            file.buffer,
            file.mimetype
          );
          finalGallery.push(uploadResult.secure_url);
        }
      }
      updateData.gallery = finalGallery;
      updateData.image = finalGallery[0] || "/images/placeholder.png"; // Set the first image as the main one

      if (updateData.price) updateData.price = Number(updateData.price);
      if (updateData.category)
        updateData.category = updateData.category.toLowerCase().trim();
      if (updateData.quantity)
        updateData.quantity = Number(updateData.quantity);

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
        return res
          .status(404)
          .json({ success: false, error: "Product not found" });
      }

      res.json({ success: true, product: updated });
    } catch (err) {
      console.error(" PUT /products ERROR:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

// ---------------- DELETE PRODUCT ----------------
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    console.log("=== DELETE /products/:id ===");
    console.log("ID:", req.params.id);

    let removed = await Product.findByIdAndDelete(req.params.id);

    if (!removed) {
      removed = await Product.findOneAndDelete({ productId: req.params.id });
    }

    if (!removed) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    // Delete image from Cloudinary
    if (removed.image) {
      try {
        const publicId = removed.image
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];
        await cloudinary.uploader.destroy(publicId);
        console.log(" Image deleted from Cloudinary");
      } catch (cloudErr) {
        console.error(" Failed to delete image:", cloudErr);
      }
    }

    console.log(" Product deleted:", removed._id);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error(" Error deleting product:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Apply error handler
router.use(handleMulterError);

export default router;
