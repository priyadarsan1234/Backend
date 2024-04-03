const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Note = require('./Note'); // Assuming you have a Note model defined

// Connect to MongoDB when the application starts
mongoose.connect('mongodb+srv://priyadarshanpradhanrinku:Rinku9668@cluster0.xwc5t31.mongodb.net/notedb')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Route to fetch notes
router.get('/:id', async function (req, res) {
    try {
        const deletenote=await Note.findByIdAndDelete(req.params.id);
        if (deletenote) {
            res.json({message:'Note Is Deleted'});
        } else {
            res.json({message:'No Data Found'});
        }
    } catch (error) {
        res.json({message:error.message});
    }
});



module.exports = router;
