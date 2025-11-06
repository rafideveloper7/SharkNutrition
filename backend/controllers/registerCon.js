import User from "../models/User.js";
import bcrypt from "bcryptjs";

const registerCon = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // Send success response
    res.status(201).json({
      message: `${fullName}, your registration request was successful.`,
      register: true,
      user: {
        fullName: newUser.fullName,
        email: newUser.email,
        id: newUser._id,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "An error occurred during signup.",
      signup: false,
      error: error.message,
    });
  }
};

export default registerCon;

