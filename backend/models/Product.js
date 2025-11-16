import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: false,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  // Single main image (optional)
  image: {
    type: String,
    default: "/images/placeholder.png"
  },

 
  gallery: {
    type: [String], // array of image URLs
    default: []
  },

  category: {
    type: String,
    required: true,
    index: true
  },

  // ✔ Already present → but keeping it for main flavor highlight
  flavor: {
    type: [String],
    default: []
  },

  //  NEW → Multiple servings like 30g, 60g, 100g etc.
  servings: {
    type: [Number],
    default: []
  },

  weight: {
    type: String,
    default: ""
  },

  // NEW → Product Description
  description: {
    type: String,
    default: ""
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for category filtering
ProductSchema.index({ category: 1, createdAt: -1 });

export default mongoose.model("Product", ProductSchema);
