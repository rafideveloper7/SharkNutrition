import express from "express";
import Product from "../models/Product.js";
import { verifyAdmin } from "../middleware/auth.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { Readable } from "stream";

const router = express.Router();

// ---------------- CLOUDINARY CONFIG ----------------
// try {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });
//   console.log("✅ Cloudinary configured");
// } catch (err) {
//   console.error("❌ Cloudinary config error:", err);
// }
// Trim env variables to avoid accidental whitespace/newline issues which
// can cause Cloudinary signature mismatches.
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY?.trim();
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET?.trim();

// Verify all Cloudinary credentials are present
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error("❌ Missing Cloudinary credentials!");
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
    signature_algorithm: 'sha256', // Try SHA-256 first, fallback to SHA-1 if needed
  });
  console.log("✅ Cloudinary configured successfully");
  console.log("🔍 Cloudinary config check:", {
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY ? `${CLOUDINARY_API_KEY.substring(0, 4)}...` : "missing",
    api_secret: CLOUDINARY_API_SECRET ? `${CLOUDINARY_API_SECRET.substring(0, 4)}...` : "missing",
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
    console.log("🔄 Uploading via direct HTTP request with unsigned preset...");
    
    // Convert buffer to base64
    const base64 = buffer.toString('base64');
    const dataUri = `data:${mimetype};base64,${base64}`;
    
    // Create FormData for direct HTTP upload
    const formData = new URLSearchParams();
    formData.append('file', dataUri);
    formData.append('upload_preset', 'ml_default'); // Your unsigned preset
    formData.append('folder', 'products'); // Add folder directly
    
    // Direct HTTP POST to Cloudinary upload endpoint
    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `Upload failed: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log("✅ Upload successful via direct HTTP!");
    
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
      ...result
    };
  } catch (error) {
    console.error("❌ Direct HTTP upload failed:", error.message);
    
    // Fallback: Try with SDK but without API secret
    console.log("🔄 Fallback: Trying SDK without API secret...");
    try {
      // Save and temporarily remove API secret
      const originalConfig = cloudinary.config();
      cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        // NO api_secret
      });
      
      const base64 = buffer.toString('base64');
      const dataUri = `data:${mimetype};base64,${base64}`;
      
      const result = await cloudinary.uploader.upload(dataUri, {
        upload_preset: "ml_default",
      });
      
      // Restore config
      cloudinary.config(originalConfig);
      
      // Move to products folder
      if (result.public_id && !result.public_id.includes('products/')) {
        try {
          const newPublicId = `products/${result.public_id}`;
          await cloudinary.uploader.rename(result.public_id, newPublicId);
          result.secure_url = result.secure_url.replace(result.public_id, newPublicId);
          result.public_id = newPublicId;
        } catch (renameErr) {
          console.log("⚠️ Upload succeeded but couldn't move to folder");
        }
      }
      
      return result;
    } catch (fallbackError) {
      console.error("❌ Fallback also failed:", fallbackError.message);
      throw fallbackError;
    }
  }
};

console.log("✅ Multer memory storage configured successfully");

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
    const hasCredentials = !!(CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET);
    
    if (!hasCredentials) {
      return res.json({ 
        success: false, 
        error: "Missing Cloudinary credentials",
        check: {
          cloud_name: !!CLOUDINARY_CLOUD_NAME,
          api_key: !!CLOUDINARY_API_KEY,
          api_secret: !!CLOUDINARY_API_SECRET,
        }
      });
    }
    
    // Test signature generation
    const testParams = {
      folder: "test",
      timestamp: Math.round(Date.now() / 1000),
    };
    
    const signature = cloudinary.utils.api_sign_request(testParams, CLOUDINARY_API_SECRET);
    
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
      }
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
      }
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
        error: "Product not found" 
      });
    }

    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- CREATE PRODUCT ----------------
router.post(
  "/",
  verifyAdmin,
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error("❌ Multer error:", err);
        return res.status(400).json({
          success: false,
          error: err.message,
        });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      console.log("=== POST /products ===");
      console.log("Body:", req.body);
      console.log("File:", req.file ? "Present" : "None");
      console.log("Admin:", req.admin);

      const { name, category, price, weight, flavor } = req.body;

      // Validation
      if (!name || !category || !price) {
        console.log("❌ Missing required fields");
        return res.status(400).json({
          success: false,
          error: "Name, category, and price are required",
          received: { name: !!name, category: !!category, price: !!price },
        });
      }

      // Validate price
      const numPrice = Number(price);
      if (isNaN(numPrice) || numPrice <= 0) {
        return res.status(400).json({
          success: false,
          error: "Price must be a valid positive number",
          received: price,
        });
      }

      // Validate category
      const validCategories = [
        "protein",
        "creatine",
        "preworkout",
        "weightgainer",
        "vitamins and minerals",
        "amino acid",
      ];
      
      const cleanCategory = category.toLowerCase().trim();
      if (!validCategories.includes(cleanCategory)) {
        return res.status(400).json({
          success: false,
          error: `Invalid category. Must be one of: ${validCategories.join(", ")}`,
          received: category,
        });
      }

      // Upload image to Cloudinary if provided
      let imageUrl = null;
      if (req.file) {
        try {
          console.log("Uploading image to Cloudinary...");
          const uploadResult = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
          imageUrl = uploadResult.secure_url;
          console.log("✅ Image uploaded:", imageUrl);
        } catch (uploadError) {
          console.error("❌ Cloudinary upload error:", uploadError);
          return res.status(500).json({
            success: false,
            error: "Failed to upload image",
            details: uploadError.message,
          });
        }
      }

      // Create product
      const newProduct = new Product({
        productId: `PROD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: name.trim(),
        category: cleanCategory,
        price: numPrice,
        weight: weight?.trim() || "",
        flavor: flavor?.trim() || "",
        image: imageUrl,
      });

      console.log("Saving product:", {
        name: newProduct.name,
        category: newProduct.category,
        price: newProduct.price,
        hasImage: !!newProduct.image,
      });

      await newProduct.save();

      console.log("✅ Product saved:", newProduct._id);
      res.status(201).json({
        success: true,
        message: "Product added successfully",
        product: newProduct,
      });
    } catch (err) {
      console.error("❌ POST /products ERROR:", err);
      console.error("Stack:", err.stack);

      // Handle validation errors
      if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({
          success: false,
          error: "Validation failed",
          details: errors,
        });
      }

      // Handle duplicate key error
      if (err.code === 11000) {
        return res.status(400).json({
          success: false,
          error: "A product with this name already exists",
        });
      }

      // Generic error
      res.status(500).json({
        success: false,
        error: "Failed to add product",
        message: err.message,
      });
    }
  }
);

// ---------------- UPDATE PRODUCT ----------------
router.put(
  "/:id",
  verifyAdmin,
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err.message,
        });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      console.log("=== PUT /products/:id ===");
      console.log("ID:", req.params.id);
      console.log("Body:", req.body);
      console.log("File:", req.file ? "Present" : "None");

      const updateData = { ...req.body };

      if (req.file) {
        try {
          console.log("Uploading new image to Cloudinary...");
          const uploadResult = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
          updateData.image = uploadResult.secure_url;
          console.log("✅ Image uploaded:", updateData.image);
          
          // Optionally delete old image from Cloudinary
          // (You can add logic here to extract public_id from old image URL and delete it)
        } catch (uploadError) {
          console.error("❌ Cloudinary upload error:", uploadError);
          return res.status(500).json({
            success: false,
            error: "Failed to upload image",
            details: uploadError.message,
          });
        }
      }

      if (updateData.price) {
        updateData.price = Number(updateData.price);
      }

      if (updateData.category) {
        updateData.category = updateData.category.toLowerCase().trim();
      }

      let updated = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updated) {
        updated = await Product.findOneAndUpdate(
          { productId: req.params.id },
          updateData,
          { new: true, runValidators: true }
        );
      }

      if (!updated) {
        return res.status(404).json({
          success: false,
          error: "Product not found",
        });
      }

      console.log("✅ Product updated:", updated._id);
      res.json({ success: true, product: updated });
    } catch (err) {
      console.error("❌ Error updating product:", err);
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
        console.log("✅ Image deleted from Cloudinary");
      } catch (cloudErr) {
        console.error("⚠️ Failed to delete image:", cloudErr);
      }
    }

    console.log("✅ Product deleted:", removed._id);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting product:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Apply error handler
router.use(handleMulterError);

export default router;