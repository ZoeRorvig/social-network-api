const { Thought, User } = require('../models');

module.exports = {
    // Get All Users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,
                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // Get a Single User
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .lean()
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({
                        user,
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // create a New User
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // Delete a User
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({
                        message: 'User deleted!'
                    })
            })
            .catch((err) => res.status(500).json(err));
    },

    // Update a User
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            {
                new: true,
                runValidators: true
            })
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({
                        message: 'User updated!'
                    })
                })
            .catch((err) => res.status(500).json(err));
    },
};