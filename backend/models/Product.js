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
  image: { 
    type: String,
    default: '/images/placeholder.png'
  },
  category: { 
    type: String, 
    required: true,
    index: true 
  },
  flavor: { 
    type: [String],
    default: []
  },
  weight: { 
    type: String,
    default: ''
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

ProductSchema.index({ category: 1, createdAt: -1 });

export default mongoose.model("Product", ProductSchema);