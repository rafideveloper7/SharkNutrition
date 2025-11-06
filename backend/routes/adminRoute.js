import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "MY_SECRET_KEY";

// ✅ LOGIN ROUTE
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ role: "admin", username }, JWT_SECRET, { expiresIn: "1h" });

  // Cookie settings for localhost
  res.cookie("adminToken", token, {
    httpOnly: true,
    secure: false,   // MUST be false for localhost HTTP
    sameSite: "lax",
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  res.json({ message: "Login successful" });
});

// ✅ VERIFY ROUTE (NEW - Add this!)
router.get("/verify", (req, res) => {
  const token = req.cookies?.adminToken;
  
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Not admin" });
    }
    res.json({ 
      message: "Authenticated", 
      username: decoded.username,
      role: decoded.role 
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

// ✅ LOGOUT ROUTE
router.post("/logout", (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  return res.json({ message: "Logged out successfully" });
});

export default router;