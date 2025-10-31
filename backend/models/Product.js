
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true }, 
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String, index: true },
  flavor: { type: [String] },
  weight: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Product", ProductSchema);
