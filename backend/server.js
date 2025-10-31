// server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import adminRoutes from './routes/adminRoute.js';
import userRoutes from './routes/userRoute.js';

import exportRoutes from './routes/exportRoutes.js';
import productRoutes from './routes/ProductRoutes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static("assets"));
app.use('/products', productRoutes);           // GET /products, POST /products (admin)
// Directory setup
const __dirname = path.resolve();
const EXPORT_DIR = path.join(__dirname, 'exports');
if (!fs.existsSync(EXPORT_DIR)) fs.mkdirSync(EXPORT_DIR);

// MongoDB connection
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sharkdb';
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// =============== ROUTES ===============
app.use('/api/admin', adminRoutes);
app.use('/users', userRoutes);

app.use('/export', exportRoutes);

// =============== SERVER START ===============
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
