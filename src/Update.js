const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Note = require('./Note'); // Assuming you have a Note model defined

// Connect to MongoDB when the application starts
mongoose.connect('mongodb+srv://priyadarshanpradhanrinku:Rinku9668@cluster0.xwc5t31.mongodb.net/notedb')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Route to fetch notes
router.post('/update', async function (req, res) {
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.body.id, 
            { $set: { userid: req.body.userid, title: req.body.title, content: req.body.content } },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ message: 'Note updated successfully', updatedNote });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
