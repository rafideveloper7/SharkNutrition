import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  paymentMethod: { type: String, enum: ["cod", "bank"] },
  cartItems: [
    {
      productId: { type: String, required: true },  
      name: String,
      price: Number,
      count: Number,
      flavor: [String],
    },
  ],
  totalAmount: Number,
}, { timestamps: true });
const Order = mongoose.model('Order', orderSchema);
export default Order;