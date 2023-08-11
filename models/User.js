import mongoose from "mongoose";
const Schema = mongoose.Schema;

let User = new Schema({
  username: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile: {
    name: {
      type: String,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    allergies: {
      type: [String],
    },
  }
});

export default mongoose.model("User", User);
