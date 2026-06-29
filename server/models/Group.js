
const mongoose = require('mongoose');

// Define the structure of a Group document
const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },

    // Array of user IDs who have admin permissions in this group
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    // Array of user IDs who are regular members
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);