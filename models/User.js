import mongoose from "mongoose";
const Schema = mongoose.Schema;

let User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure unique usernames
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String, // Use the String type for the email field
    required: true,
    unique: true, // Ensure unique emails
  },
});

export default mongoose.model("User", User);
