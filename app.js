import express from 'express';
import userRoutes from './routes/users.js';
import orderRoutes from './routes/orders.js'; // Add .js file extension

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
