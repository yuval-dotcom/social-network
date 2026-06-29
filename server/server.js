

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from the .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Middleware to allow the React client to communicate with this server
app.use(cors());

// Middleware to allow the server to receive and parse JSON data from requests
app.use(express.json());

// Connect to MongoDB using the connection string from the .env file
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch((error) => console.error('MongoDB connection error:', error));

// A simple route to test if the server is running properly
app.get('/', (req, res) => {
    res.send('Server is running properly.');
});

// Start the server and listen for incoming requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});