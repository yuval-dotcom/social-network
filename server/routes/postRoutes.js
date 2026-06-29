
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Define the routes and map them to the controller functions
router.post('/', postController.createPost);          // Create a post
router.get('/', postController.getPosts);             // List all posts
router.get('/search/query', postController.searchPosts); // Search posts (must be defined before /:id)
router.put('/:id', postController.updatePost);        // Update a post by ID
router.delete('/:id', postController.deletePost);     // Delete a post by ID

module.exports = router;