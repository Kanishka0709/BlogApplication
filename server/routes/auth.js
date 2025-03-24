const express = require("express");
const User = require("../models/User"); // Import User model
const router = express.Router();

// 🔹 Register User
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // 🔹 Check if username already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // 🔹 Create new user
    user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
