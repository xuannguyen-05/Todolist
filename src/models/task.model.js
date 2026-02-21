const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        isDone: {
            type: Boolean,
            default: false
        },
        doneAt: {
            type: Date,
            default: null
        }
    },
    {timestamps: true}
);

const Task = mongoose.model("Task", TaskSchema)

module.exports = Task