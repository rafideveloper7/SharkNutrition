
import User from '../models/User.js';

export const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ userCount: count });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
