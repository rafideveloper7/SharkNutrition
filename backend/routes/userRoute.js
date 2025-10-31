// routes/exportRoutes.js
import express from "express";
import fs from "fs";
import path from "path";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();
const EXPORT_DIR = path.join(path.resolve(), 'exports');

router.get('/users/excel', verifyAdmin, (req, res) => {
  const file = path.join(EXPORT_DIR, 'users.xlsx');
  if (!fs.existsSync(file)) return res.status(404).send('No file');
  res.download(file);
});

router.get('/users/text', verifyAdmin, (req, res) => {
  const file = path.join(EXPORT_DIR, 'users.txt');
  if (!fs.existsSync(file)) return res.status(404).send('No file');
  res.download(file);
});

router.get('/details/excel', verifyAdmin, (req, res) => {
  const file = path.join(EXPORT_DIR, 'userDetails.xlsx');
  if (!fs.existsSync(file)) return res.status(404).send('No file');
  res.download(file);
});

router.get('/details/text', verifyAdmin, (req, res) => {
  const file = path.join(EXPORT_DIR, 'userDetails.txt');
  if (!fs.existsSync(file)) return res.status(404).send('No file');
  res.download(file);
});

export default router;
