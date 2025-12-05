import users from "../models/User.js";

const registerAuth = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "This email is already registered." });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: `${fullName}, your email format is invalid.` });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error during signup validation." });
  }
};

export default registerAuth;
