// src/routes/orders.js
import express from 'express';
import User from '../models/UserModel.js'; // Add .js file extension
import Order from '../models/OrderModel.js'; // Add .js file extension

const router = express.Router();

// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new order
router.post("/", async (req, res) => {
  const { userId, sandwich, side, sideSize, total, deliveryInstructions } = req.body;

  try {
    // Check if the user with the provided userId exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const order = new Order({
      user: userId,
      sandwich,
      side,
      sideSize,
      total,
      deliveryInstructions,
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
