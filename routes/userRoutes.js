// src/routes/userRoutes.js

import express from 'express';
import User from '../models/UserModel.js'; // Add .js file extension

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new user
router.post("/", async (req, res) => {
  const { username, street, city, zipCode, phone, allergies } = req.body;

  const user = new User({
    username,
    street,
    city,
    zipCode,
    phone,
    allergies,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
