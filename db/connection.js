import mongoose from 'mongoose';
import chalk from 'chalk';
import dotenv from 'dotenv';

// Load environment variables from .env file
// dotenv.config();

const MONGODB_URI = "mongodb://127.0.0.1:27017/my-db-dropwhich-backend"

// This is for Model.findByIdAndUpdate method, specifically so that {new: true} is the default
mongoose.set('returnOriginal', false);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log('Error connecting to MongoDB: ', error.message));

mongoose.connection.on('disconnected', () => console.log(chalk.bold('Disconnected from MongoDB!')));

mongoose.connection.on('error', (error) => console.error(chalk.red(`MongoDB connection error: ${error}`)));

export default mongoose.connection;
