import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

dotenv.config();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "MY_SECRET_KEY";
const COOKIE_NAME = "adminToken";

// =============== LOGIN ROUTE ===============
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("🔐 Login attempt:", username);

    const admin = await Admin.findOne({ username });

    if (!admin) {
      console.log(" Admin not found");
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log(" Password incorrect");
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, isAdmin: true },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    console.log(" Login successful, cookie set");

    res.json({
      success: true,
      message: "Login successful",
      admin: { id: admin._id, username: admin.username, name: admin.name },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, error: "Login failed" });
  }
});

// =============== VERIFY ROUTE ===============
router.get("/verify", (req, res) => {
  console.log("🔍 Verify route hit");
  console.log("Cookies:", req.cookies);

  const token =
    req.cookies[COOKIE_NAME] || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, error: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ success: true, admin: decoded });
  } catch (err) {
    res.status(401).json({ success: false, error: "Invalid token" });
  }
});

//  LOGOUT ROUTE
router.post("/logout", (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  });

  return res.json({ message: "Logged out successfully" });
});

export default router;
