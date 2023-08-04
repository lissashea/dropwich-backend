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
  const { name, street, city, zipCode, phone, allergies } = req.body;
  const userId = req.user.userId; // Assuming the JWT payload contains the user ID as "userId"

  try {
    const profile = new Profile({
      username: '', // You can set this to an empty string or any other default value
      name,
      street,
      city,
      zipCode,
      phone,
      email: '', // You can set this to an empty string or any other default value
      allergies,
    });

    // Set the user ID in the profile object before saving it
    profile.user = userId;

    const newProfile = await profile.save();
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
