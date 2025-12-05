// routes/reviewRoutes.js
import express from "express";
import { addReview, getReviews, deleteReview,getAllReviews} from "../controllers/reviewController.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();
router.get("/all", verifyAdmin, getAllReviews);
// ADD review (public)
router.post("/", addReview);

// GET reviews for a product
router.get("/:productId", getReviews);

// DELETE review (admin only)
router.delete("/:id",verifyAdmin,  deleteReview);

export default router;
