// controllers/reviewController.js
import Review from "../models/Review.js";
import Product from "../models/Product.js";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("productId", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
// ---------------- ADD REVIEW ----------------
export const addReview = async (req, res) => {
  try {
    const { productId, userId, name, email, message, rating } = req.body;

    if (!productId || !userId || !name || !email || !message || !rating) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    // Create review
    const newReview = await Review.create({
      productId,
      userId,
      name,
      email,
      message,
      rating,
    });

    // Update product rating + reviewCount
    const reviews = await Review.find({ productId });

    const averageRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      ratings: {
        averageRating: averageRating,
        totalRatings: reviews.length,
      },
    });
    const updatedProduct = await Product.findById(productId);

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review: newReview,
      updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ---------------- GET REVIEWS (BY PRODUCT) ----------------
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort(
      {
        createdAt: -1,
      }
    );

    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ---------------- DELETE REVIEW (ADMIN) ----------------
export const deleteReview = async (req, res) => {
  try {
    const removed = await Review.findByIdAndDelete(req.params.id);

    if (!removed) {
      return res.status(404).json({
        success: false,
        error: "Review not found",
      });
    }

    const reviews = await Review.find({ productId: removed.productId });

    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    const updatedProduct = await Product.findByIdAndUpdate(
      removed.productId,
      {
        ratings: {
          averageRating: averageRating,
          totalRatings: reviews.length,
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Review deleted successfully",
      updatedProduct,
    });
  } catch (err) {
    console.error("Error deleting review:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
