// controllers/users.js
import Profile from '../models/Profile.js';
import User from '../models/User.js';

export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfileById = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProfile = async (req, res) => {
  const { username, name, street, city, zipCode, phone, allergies } = req.body;

  try {
    // Find the user based on the username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new profile with the provided data and link it to the user
    const profile = new Profile({
      username: user.username,
      name,
      street,
      city,
      zipCode,
      phone,
      allergies,
    });

    // Save the new profile to the database
    const newProfile = await profile.save();

    // Return the newly created profile in the response
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { username, name, street, city, zipCode, phone, allergies } = req.body;

  try {
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    profile.username = username;
    profile.name = name;
    profile.street = street;
    profile.city = city;
    profile.zipCode = zipCode;
    profile.phone = phone;
    profile.allergies = allergies;

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    await Profile.deleteOne({ _id: id });
    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
