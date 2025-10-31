import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wishlist: { type: [String], default: [] }, 
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
