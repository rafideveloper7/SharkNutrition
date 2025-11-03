import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  tel: String,
  subjects: [String],
  message: String,
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;