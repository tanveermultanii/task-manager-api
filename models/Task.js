const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Links task to a user
    createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
