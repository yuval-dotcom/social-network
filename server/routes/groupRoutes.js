
const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.post('/', groupController.createGroup); // Create a group
router.get('/', groupController.getGroups);    // List groups

module.exports = router;