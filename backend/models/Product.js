import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  discountPercent: {
    type: Number,
    default: 0,
  },

  discountedPrice: {
    type: Number,
    default: 0,
  },

  quantity: {
    type: Number,
    required: true,
    default: 0,
  },

  ratings: {
    averageRating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
  },

  image: {
    type: String,
    default: "/images/placeholder.png",
  },

  gallery: {
    type: [String],
    default: [],
  },

  category: {
    type: String,
    required: true,
    index: true,
  },

  flavor: {
    type: [String],
    default: [],
  },

  servings: {
    type: [Number],
    default: [],
  },

  weight: {
    type: String,
    default: "",
  },

  description: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 👉 Auto calculate before SAVE
ProductSchema.pre("save", function (next) {
  if (this.discountPercent > 0) {
    this.discountedPrice = Math.round(
      this.price - (this.price * this.discountPercent) / 100
    );
  } else {
    this.discountedPrice = this.price;
  }
  next();
});

// 👉 Auto calculate before UPDATE (important!)
ProductSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.price !== undefined || update.discountPercent !== undefined) {
    const price = update.price ?? this._update.$set?.price;
    const discount =
      update.discountPercent ?? this._update.$set?.discountPercent;

    if (price !== undefined && discount !== undefined) {
      update.discountedPrice = Math.round(price - (price * discount) / 100);
    }
  }

  next();
});

export default mongoose.model("Product", ProductSchema);
