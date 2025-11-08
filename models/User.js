import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
 wishlist: [
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  }
], 
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
