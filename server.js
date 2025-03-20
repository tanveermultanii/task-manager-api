const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); 

app.get('/', (req, res) => {
    res.send('Task Manager API is running!');
});

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB Connection Error:', err.message);
    });