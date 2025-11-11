// middleware/auth.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "MY_SECRET_KEY";

export const verifyAdmin = (req, res, next) => {
  // ✅ Token from cookie or Authorization header
const authHeader = req.headers.authorization;
const token = req.cookies?.adminToken || (authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);
if (!token) return res.status(403).json({ message: "No token provided" });


  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // ✅ Fix: use isAdmin (not role)
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
