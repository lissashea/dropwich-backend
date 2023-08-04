import mongoose from "mongoose";
const Schema = mongoose.Schema;

let Profile = new Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
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
  email: {
    type: String, // Use the String type for the email field
  },
  allergies: {
    type: [String],
  },
});

// Pre-save middleware to autofill the username field based on the associated User model
Profile.pre("save", async function (next) {
  if (!this.username) {
    try {
      // Find the associated User model based on the email
      const user = await User.findOne({ email: this.email });
      if (user) {
        this.username = user.username;
      } else {
        // Handle the case when there is no associated User with the email (optional)
        // For example, you can generate a default username or throw an error
        this.username = "default_username";
      }
    } catch (error) {
      // Handle any errors that may occur during the database query (optional)
      console.error(error);
    }
  }
  next();
});

export default mongoose.model("Profile", Profile);
