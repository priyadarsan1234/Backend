const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Note = require('./Note'); // Assuming you have a Note model defined

// Connect to MongoDB when the application starts
mongoose.connect('mongodb+srv://priyadarshanpradhanrinku:Rinku9668@cluster0.xwc5t31.mongodb.net/notedb')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Route to fetch notes
router.get('/fetch', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
