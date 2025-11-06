// routes/exportRoutes.js
import express from "express";
import fs from "fs";
import path from "path";
import { verifyAdmin } from "../middleware/auth.js";
import User from "../models/User.js";
import registerAuth from "../middleware/registerAuth.js";
import registerCon from "../controllers/registerCon.js";
import loginCon from "../controllers/loginCon.js";
import { getUserCount } from '../controllers/userController.js';
const router = express.Router();
const EXPORT_DIR = path.join(path.resolve(), 'exports');

//Auth Routes
router.post("/register",registerAuth,registerCon);

router.post("/login",loginCon); 


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


router.get('/orders/excel', verifyAdmin, (req, res) => {
  const file = path.join(EXPORT_DIR, 'orders.xlsx');
  if (!fs.existsSync(file)) return res.status(404).send('No file');
  res.download(file);
});

router.get('/orders/text', verifyAdmin, (req, res) => {
  const file = path.join(EXPORT_DIR, 'orders.txt');
  if (!fs.existsSync(file)) return res.status(404).send('No file');
  res.download(file);
});

router.get('/getAllUsers',  async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 }).lean();
  
    
   

    res.json({
      success: true,
      message: "All users retrieved successfully",
      users,
    });
  } catch (err) {
    console.error("Error retrieving all users:", err);
    res.status(500).json({
      error: "Failed to retrieve all users",
      message: err.message,
    });
  }
});
router.get('/stats/count', getUserCount);
// ADD / REMOVE WISHLIST ITEM (BY EMAIL)

router.post('/wishlist', async (req, res) => {
  const { email, productId, action } = req.body;

  if (!email || !productId || !action) {
    return res.status(400).json({ message: "Email, productId and action are required" });
  }

  try {
    const user = await User.findOne({ email }).populate('wishlist.productId');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (action === 'add') {
      // check if already exists
      const exists = user.wishlist.some(
        (item) => item.productId?._id?.toString() === productId
      );

      if (exists) {
        return res.status(400).json({ message: "Product already in wishlist" });
      }

      user.wishlist.push({ productId });
    } 

    else if (action === 'remove') {
      // ✅ compare productId._id with given productId
      const beforeCount = user.wishlist.length;
      user.wishlist = user.wishlist.filter(
        (item) => item.productId?._id?.toString() !== productId
      );

      if (user.wishlist.length === beforeCount) {
        return res.status(404).json({ message: "Product not found in wishlist" });
      }
    } 

    else {
      return res.status(400).json({ message: "Action must be 'add' or 'remove'" });
    }

    await user.save();

    const updatedUser = await User.findOne({ email }).populate('wishlist.productId');

    res.status(200).json({
      message: `Product ${action}ed to wishlist successfully`,
      wishlist: updatedUser.wishlist,
    });

  } catch (err) {
    console.error("Error updating wishlist:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET USER WITH POPULATED WISHLIST (BY EMAIL)
router.get('/wishlist/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email })
      .select('-password')
      .populate('wishlist.productId');

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ wishlist: user.wishlist });

  } catch (err) {
    console.error("Error fetching wishlist:", err);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
