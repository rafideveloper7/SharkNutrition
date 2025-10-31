// scripts/seedProducts.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import { products } from "../data.js"; // adjust relative path

dotenv.config();

const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/sharkdb";

async function seed() {
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected");

  // Delete all existing products first
  await Product.deleteMany({});
  console.log("Deleted existing products");


  const flat = [];
  products.forEach(group => {
    (group.products || []).forEach(p => {
      flat.push({
        productId: p.productId,
        name: p.name,
        price: Number(p.price),
        image: p.image,
        category: group.category,
        flavor: p.flavor,
        weight: p.weight,
        description: p.description || ""
      });
    });
  });

  for (const p of flat) {
    await Product.create(p);
    console.log("Inserted", p.productId);
  }

  console.log("Done");
  process.exit(0);
}
seed().catch(err => { console.error(err); process.exit(1); });
