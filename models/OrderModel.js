
import mongoose from "mongoose";
const Schema = mongoose.Schema;

let Order = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users", // Reference to the User model for linking orders to users
    required: true,
  },
  sandwich: {
    type: String,
    required: true,
  },
  side: {
    type: String,
    required: true,
  },
  sideSize: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  deliveryInstructions: {
    type: String,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("orders", Order);
