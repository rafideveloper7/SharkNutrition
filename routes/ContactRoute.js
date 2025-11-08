// backend/routes/contact.js
import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, tel, subjects, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    const contact = new Contact({
      name,
      email,
      tel,
      subjects,
      message,
    });

    await contact.save();

    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error, please try again later." });
  }
});

export default router;
