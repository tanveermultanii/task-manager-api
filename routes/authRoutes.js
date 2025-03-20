const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();
const { check, validationResult } = require('express-validator');

// signup Route
router.post('/signup', [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // compare password
        const isMatch = await require('bcryptjs').compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // generate JWT Token
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
