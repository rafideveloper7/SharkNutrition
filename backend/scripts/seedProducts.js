import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import { products } from "../data.js";

dotenv.config();

const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Shark-Nutrition";

async function seed() {
  try {
    await mongoose.connect(MONGO);
    console.log(" Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    const flatProducts = [];
    
    products.forEach(category => {
      if (!category.products || !Array.isArray(category.products)) {
        return;
      }

      category.products.forEach(p => {
        if (!p.productId || !p.name || p.price == null) {
          return;
        }

        flatProducts.push({
          productId: String(p.productId),
          name: p.name,
          price: Number(p.price),
          image: p.image || '/images/placeholder.png',
          category: category.category,
          flavor: Array.isArray(p.flavor) ? p.flavor : (p.flavor ? [p.flavor] : []),
          weight: p.weight || ''
        });
      });
    });

    if (flatProducts.length === 0) {
      console.error(" No valid products to insert!");
      process.exit(1);
    }

    console.log(` Inserting ${flatProducts.length} products...`);

    const inserted = await Product.insertMany(flatProducts);
    console.log(` Successfully inserted ${inserted.length} products`);

    const count = await Product.countDocuments();
    console.log(`Total products in database: ${count}`);

    console.log(" Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error(" Seeding failed:", err);
    process.exit(1);
  }
}

seed();