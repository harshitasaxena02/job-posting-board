const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const mongoose = require('mongoose');
require('dotenv').config();  // To load environment variables

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {  // Use .env for the MongoDB URI
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Database connection failed', error.message);
    process.exit(1); // Exits the process with a failure code if DB connection fails
  }
};

// Call the function to connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 5000; // Use .env for port as well
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful Shutdown: Handle termination signals
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
  });
});
