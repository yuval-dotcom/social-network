
const mongoose = require('mongoose');

// Define the structure of a User document
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // timestamps: true automatically adds 'createdAt' and 'updatedAt' fields
}, { timestamps: true });

// Export the model so we can use it in other files
module.exports = mongoose.model('User', userSchema);