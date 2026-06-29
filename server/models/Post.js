
const mongoose = require('mongoose');

// Define the structure of a Post document
const postSchema = new mongoose.Schema({
    text: { type: String, required: true },

    // The user who wrote the post
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // If the post belongs to a group. If it is null, it is a personal feed post.
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null },

    // URL for the HTML5 video requirement (can be empty)
    videoUrl: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);