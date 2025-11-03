import users from "../models/User.js";
import bcrypt from "bcryptjs";

const loginCon = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
        login: false,
      });
    }

    // Find user WITHOUT populating wishlist first (to avoid errors)
    const existingUser = await users.findOne({ email });
    
    if (!existingUser) {
      return res.status(401).json({
        message: "Incorrect email.",
        login: false,
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password.",
        login: false,
      });
    }

   
    let populatedUser;
    try {
      populatedUser = await users
        .findOne({ email })
        .select('-password')
        .populate('wishlist.productId');
    } catch (populateError) {
      console.warn("Wishlist populate failed, returning without population:", populateError);
      populatedUser = existingUser;
    }

    // Return user data
    return res.status(200).json({
      message: `${existingUser.fullName}, login successful`,
      login: true,
      _id: populatedUser._id,
      fullName: populatedUser.fullName,
      email: populatedUser.email,
      wishlist: populatedUser.wishlist || [],
      createdAt: populatedUser.createdAt,
      updatedAt: populatedUser.updatedAt
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Server error during login.",
      login: false,
      error: error.message 
    });
  }
};

export default loginCon;