import app from "./api/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected (local)");
    }

    app.listen(PORT, () => {
      console.log(`Server running locally on http://localhost:${PORT}`);
      console.log(`Test URL: http://localhost:${PORT}/test`);
    });
  } catch (err) {
    console.error("Failed to start server locally:", err);
  }
};

startServer();
