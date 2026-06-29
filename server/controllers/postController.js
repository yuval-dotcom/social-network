
const Post = require('../models/Post');

// 1. CREATE: Add a new post
exports.createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);
        await newPost.save();
        res.status(201).json(newPost); // 201 means "Created successfully"
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 2. LIST: Get all posts
exports.getPosts = async (req, res) => {
    try {
        // .populate() fetches the actual data of the author and group, not just their IDs
        const posts = await Post.find().populate('author').populate('group');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. UPDATE: Edit an existing post
exports.updatePost = async (req, res) => {
    try {
        // req.params.id gets the ID from the URL. { new: true } returns the updated document.
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 4. DELETE: Remove a post
exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 5. SEARCH (Requirement 22): Search with at least 3 parameters
// Parameters allowed: text (content), author (ID), group (ID)
exports.searchPosts = async (req, res) => {
    try {
        // req.query gets parameters from the URL (e.g., ?text=hello&author=123)
        const { text, author, group } = req.query;
        let query = {}; // Start with an empty query object

        // If 'text' is provided, search for it (case-insensitive)
        if (text) {
            query.text = { $regex: text, $options: 'i' };
        }
        // If 'author' is provided, add it to the query
        if (author) {
            query.author = author;
        }
        // If 'group' is provided, add it to the query
        if (group) {
            query.group = group;
        }

        const posts = await Post.find(query);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};