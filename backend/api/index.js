import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Import routes
import adminRoutes from '../routes/adminRoute.js';
import userRoutes from '../routes/userRoute.js';
import orderRoutes from '../routes/orderRoutes.js';
import exportRoutes from '../routes/exportRoutes.js';
import productRoutes from '../routes/ProductRoutes.js';
import contactRoutes from '../routes/ContactRoute.js';
import couponRoutes from '../routes/couponRoutes.js';

// =============== GLOBAL DB CONNECTION ===============
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    throw err;
  }
};

// =============== EXPRESS APP ===============
const app = express();

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'https://sharknutritionpk.store'], credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/export', exportRoutes);
app.use('/products', productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/coupons', couponRoutes);

// Test route
app.get('/test', async (req, res) => {
  try {
    await connectDB();
    res.json({ message: 'Server is working!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', method: req.method, url: req.url });
});

// Export serverless handler
export default serverless(app);
