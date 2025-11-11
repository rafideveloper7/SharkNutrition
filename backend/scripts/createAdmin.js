// scripts/createAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Admin from "../models/Admin.js"; // adjust path if needed

async function main() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("Error: MONGO_URI not set in .env");
    process.exit(1);
  }

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "123456";
  const name = process.env.ADMIN_NAME || "Super Admin";

  // Check if admin already exists
  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log(`Admin with username "${username}" already exists. Exiting.`);
    await mongoose.disconnect();
    process.exit(0);
  }

  const admin = new Admin({
    username,
    password, // will be hashed by pre-save middleware
    name,
  });

  await admin.save();
  console.log("✅ Admin created:");
  console.log({ username: admin.username, name: admin.name, id: admin._id });

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("Error creating admin:", err);
  process.exit(1);
});
