import express from "express";
import { verifyAdmin } from "../middleware/auth.js";
import registerAuth from "../middleware/registerAuth.js";
import registerCon from "../controllers/registerCon.js";
import loginCon from "../controllers/loginCon.js";
import { getUserCount } from "../controllers/userController.js";
import User from "../models/User.js";
import ExcelJS from "exceljs";

const router = express.Router();

// ----------------- Auth Routes -----------------
router.post("/register", registerAuth, registerCon);
router.post("/login", loginCon);

// ----------------- Export Routes -----------------
// Generate and send users Excel dynamically
router.get("/users/excel", verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 }).lean();
    if (!users.length) return res.status(404).send("No users found");

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    worksheet.columns = [
      { header: "Name", key: "name", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Created At", key: "createdAt", width: 25 },
    ];

    users.forEach((user) => {
      worksheet.addRow({
        name: user.name || "",
        email: user.email,
        createdAt: user.createdAt,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating Excel", error: err.message });
  }
});

// Generate and send users text dynamically
router.get("/users/text", verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 }).lean();
    if (!users.length) return res.status(404).send("No users found");

    const lines = users.map(
      (u) => `Name: ${u.name || ""}, Email: ${u.email}, Created At: ${u.createdAt}`
    ).join("\n");

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Content-Disposition", "attachment; filename=users.txt");
    res.send(lines);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating text file", error: err.message });
  }
});

// ----------------- User Stats -----------------
router.get("/stats/count", getUserCount);

// ----------------- Wishlist Routes -----------------
router.post("/wishlist", async (req, res) => {
  const { email, productId, action } = req.body;

  if (!email || !productId || !action) {
    return res.status(400).json({ message: "Email, productId and action are required" });
  }

  try {
    const user = await User.findOne({ email }).populate("wishlist.productId");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (action === "add") {
      const exists = user.wishlist.some(
        (item) => item.productId?._id?.toString() === productId
      );
      if (exists) return res.status(400).json({ message: "Product already in wishlist" });
      user.wishlist.push({ productId });
    } else if (action === "remove") {
      const beforeCount = user.wishlist.length;
      user.wishlist = user.wishlist.filter(
        (item) => item.productId?._id?.toString() !== productId
      );
      if (user.wishlist.length === beforeCount)
        return res.status(404).json({ message: "Product not found in wishlist" });
    } else {
      return res.status(400).json({ message: "Action must be 'add' or 'remove'" });
    }

    await user.save();
    const updatedUser = await User.findOne({ email }).populate("wishlist.productId");

    res.status(200).json({
      message: `Product ${action}ed to wishlist successfully`,
      wishlist: updatedUser.wishlist,
    });
  } catch (err) {
    console.error("Error updating wishlist:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/wishlist/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email })
      .select("-password")
      .populate("wishlist.productId");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ wishlist: user.wishlist });
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------- Get All Users -----------------
router.get("/getAllUsers", async (req, res) => {
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

export default router;
