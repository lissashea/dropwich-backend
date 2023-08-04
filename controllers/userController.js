// controllers/users.js
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Function to generate a JSON Web Token (JWT)
const generateToken = (userId) => {
  const secretKey = 'your-secret-key'; // Replace this with your secret key for JWT
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
};

export const signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user with the provided username in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT for the user
    const token = generateToken(user._id);

    // Return the token and any other user data you want to include in the response
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signUp = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if a user with the provided username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of salt

    // Create a new user with the provided data
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate a JWT for the user
    const token = generateToken(newUser._id);

    // Return the token and any other user data you want to include in the response
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, email } = req.body;

  try {
    // Check if the user with the provided ID exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user properties
    user.username = username;
    user.email = email;

    // Hash the new password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

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
    await User.deleteOne({ _id: id });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  