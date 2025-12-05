// routes/exportRoutes.js
import express from "express";
import fs from "fs";
import path from "path";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

const __dirname = path.resolve();
const EXPORT_DIR = path.join(__dirname, "exports");

// Ensure exports folder exists
if (!fs.existsSync(EXPORT_DIR)) fs.mkdirSync(EXPORT_DIR);



// Export Users (Excel)
router.get("/users/excel", verifyAdmin, (req, res) => {
  const file = path.join(EXPORT_DIR, "users.xlsx");
  if (!fs.existsSync(file)) return res.status(404).send("No file");
  res.download(file);
});

// Export Users (Text)
router.get("/users/text", verifyAdmin, (req, res) => {
  const file = path.join(EXPORT_DIR, "users.txt");
  if (!fs.existsSync(file)) return res.status(404).send("No file");
  res.download(file);
});

// Export User Details (Excel)
router.get("/details/excel", verifyAdmin, (req, res) => {
  const file = path.join(EXPORT_DIR, "userDetails.xlsx");
  if (!fs.existsSync(file)) return res.status(404).send("No file");
  res.download(file);
});

// Export User Details (Text)
router.get("/details/text", verifyAdmin, (req, res) => {
  const file = path.join(EXPORT_DIR, "userDetails.txt");
  if (!fs.existsSync(file)) return res.status(404).send("No file");
  res.download(file);
});

export default router;
