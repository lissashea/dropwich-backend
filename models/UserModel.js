// src/models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  allergies: {
    type: [String], // An array of strings to store allergies
  },
});

const User = mongoose.model("User", userSchema);

export default User;
