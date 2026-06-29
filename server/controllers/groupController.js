
const Group = require('../models/Group');

// CREATE: Create a new group
exports.createGroup = async (req, res) => {
    try {
        const { name, description, creatorId } = req.body;

        // The user who creates the group becomes the first admin automatically
        const newGroup = new Group({
            name,
            description,
            admins: [creatorId], // Adding creator as admin (Assignment requirement)
            members: [creatorId] // Adding creator as a regular member too
        });

        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// LIST: Get all groups
exports.getGroups = async (req, res) => {
    try {
        // Populate brings the actual user data for admins and members
        const groups = await Group.find().populate('admins').populate('members');
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};