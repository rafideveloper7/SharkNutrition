// server.js
import app from './api/index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('MongoDB connected (local)');
    }
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
};

// Start server locally
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
    console.log(`Test URL: http://localhost:${PORT}/test`);
  });
};

// Start
startServer();
