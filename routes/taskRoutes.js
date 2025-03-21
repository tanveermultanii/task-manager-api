const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// create a new task 
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({ title, description, user: req.user });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// get all tasks for logged-in user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// update a task 
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task || task.user.toString() !== req.user) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// delete a task 
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task || task.user.toString() !== req.user) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.deleteOne();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// protected route to test authentication
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Welcome! You are authorized.', user: req.user });
});

module.exports = router;

