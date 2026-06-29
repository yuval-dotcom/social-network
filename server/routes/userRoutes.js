
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser); // Register route
router.get('/', userController.getUsers);    // List users route

module.exports = router;