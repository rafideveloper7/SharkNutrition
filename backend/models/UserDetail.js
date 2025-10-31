
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  productId: Number,
  name: String,
  price: Number,
  weight: String,
  flavor: String,
  image: String,
  category: String,
}, { _id: false });

const UserDetailSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  city: String,
  address: String,
  mobile: String,
  email: String,
  note: String,
  paymentMethod: String,
  product: ProductSchema, 
}, { timestamps: true });

export default mongoose.model('UserDetail', UserDetailSchema);

