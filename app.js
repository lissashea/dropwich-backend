import express from 'express';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'; // Add .js file extension

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
