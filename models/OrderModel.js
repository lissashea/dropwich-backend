// src/models/Order.js

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model for linking orders to users
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

const Order = mongoose.model("Order", orderSchema);

export default Order;
