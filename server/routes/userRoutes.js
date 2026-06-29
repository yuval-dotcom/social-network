// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser); // Register route
router.get('/', userController.getUsers);    // List users route
router.post('/login', userController.loginUser); // NEW: Login route

module.exports = router;