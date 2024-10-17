require('dotenv').config();

const express = require('express');
const connectDB = require('./db'); // Import the connectDB function
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes'); 
const applicationRoutes = require('./routes/applicationRoutes'); // Import application routes

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your frontend's URL
}));
app.use(express.json()); // Parses incoming JSON requests

// Connect to the database
connectDB();

// Route definitions
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/applications', applicationRoutes); // Application routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
