const { Schema, Types } = require("mongoose");
const moment = require ('moment')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => moment(date).format("MMM Do, YYYY h:mma"),
            // get: date => date.toDateString()
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

module.exports = reactionSchema;