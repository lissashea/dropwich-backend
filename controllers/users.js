// controllers/users.js
import User from '../models/UserModel.js';

export const getUsers = async (req, res) => {
  try {
    // Find all users in the database
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user with the provided ID in the database
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { username, street, city, zipCode, phone, allergies } = req.body;

  try {
    // Create a new user with the provided data
    const user = new User({
      username,
      street,
      city,
      zipCode,
      phone,
      allergies,
    });

    // Save the new user to the database
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, street, city, zipCode, phone, allergies } = req.body;

  try {
    // Check if the user with the provided ID exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user properties
    user.username = username;
    user.street = street;
    user.city = city;
    user.zipCode = zipCode;
    user.phone = phone;
    user.allergies = allergies;

    // Save the updated user
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the user with the provided ID exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await user.remove();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
