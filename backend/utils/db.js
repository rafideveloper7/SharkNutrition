import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("MONGO_URI must be defined");
}

let cached = globalThis._mongo;

if (!cached) {
  cached = globalThis._mongo = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
