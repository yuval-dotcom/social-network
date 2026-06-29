
const User = require('../models/User');

// CREATE: Register a new user
exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        // If username already exists, MongoDB throws an error (code 11000)
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        res.status(400).json({ message: error.message });
    }
};

// LIST: Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// LOGIN: Authenticate a user
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find a user in MongoDB that matches BOTH the username and the password
        const user = await User.findOne({ username: username, password: password });

        if (!user) {
            // Assignment Requirement: Handle edge cases (wrong password/username)
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // If found, send the user data back to React
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};