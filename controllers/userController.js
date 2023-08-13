// controllers/users.js
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Function to generate a JSON Web Token (JWT)
const generateToken = (userId) => {
  const secretKey = 'your-secret-key'; // Replace this with your secret key for JWT
  return jwt.sign({ userId }, secretKey, { expiresIn: '365d' });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user with the provided email in the database
    const user = await User.findOne({ email });
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

    // Return the token and user object
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const signUp = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of salt

    // Create a new user with the provided data and an empty profile
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      profile: {
        name: "",
        street: "",
        city: "",
        zipCode: "",
        phone: "",
        email: "",
        allergies: [],
      }
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
  const { username, password, email, profile } = req.body;

  try {
    // Check if the user with the provided ID exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user properties
    if (username) user.username = username;
    if (email) user.email = email;

    // Update profile details if provided
    if (profile) {
      // Merge the existing profile with the provided updates
      user.profile = {
        ...user.profile.toObject(),
        ...profile
      };
    }

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

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserByToken = async (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    const user = await User.findById(userId);
 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error in getUserByToken: ", error);  // Log the error
    res.status(500).json({ message: "Failed to authenticate token or other error." });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};