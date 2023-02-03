const { Thought, User } = require('../models');

module.exports = {
    // Get All Thoughts
    getThoughts(req, res) {
        Thought.find()
            .then(async (thoughts) => {
                const thoughtObj = {
                    thoughts,
                };
                return res.json(thoughtObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // Get a Single Thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .lean()
            .then(async (thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json({
                        thought,
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // create a New Thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thought._id } },
                    {
                        new: true,
                        runValidators: true
                    },
                )
            })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    // Delete a Thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json({
                        message: 'Thought deleted!'
                    })
            })
            .then((thought) => {
                return User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    {
                        new: true,
                        runValidators: true
                    },
                )
            })
            .catch((err) => res.status(500).json(err));
    },

    // Update a Thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            {
                new: true,
                runValidators: true
            })
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json({
                        message: 'Thought updated!'
                    })
            })
            .catch((err) => res.status(500).json(err));
    },

    // Add Reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            {
                new: true,
                runValidators: true
            })
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json({
                        message: 'Reaction added!'
                    })
            })
            .catch((err) => res.status(500).json(err));
    },

    // Remove Reaction
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            {
                new: true,
            })
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json({
                        message: 'Reaction removed!'
                    })
            })
            .catch((err) => res.status(500).json(err));
    },
};

