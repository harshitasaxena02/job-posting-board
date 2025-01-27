const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Database connection failed', error.message);
    process.exit(1); // Exits the process with a failure code
  }
};

module.exports = connectDB;

