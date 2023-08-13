// import mongoose from "mongoose";
// import User from "./User.js"; // Make sure to provide the correct path to the User model

// const Schema = mongoose.Schema;

// let Profile = new Schema({
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: "User", // Reference the User model
//     required: true,
//   },
//   username: {
//     type: String,
//     required: false,
//   },
//   name: {
//     type: String,
//   },
//   street: {
//     type: String,
//   },
//   city: {
//     type: String,
//   },
//   zipCode: {
//     type: String,
//   },
//   phone: {
//     type: String,
//   },
//   email: {
//     type: String, // Use the String type for the email field
//   },
//   allergies: {
//     type: [String],
//   },
// });


// export default mongoose.model("Profile", Profile);