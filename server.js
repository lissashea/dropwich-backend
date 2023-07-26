import express from "express";
import orderRoutes from "./src/routes/orderRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
