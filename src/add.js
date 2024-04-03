const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Note = require('./Note'); // Assuming you have a Note model defined

// Connect to MongoDB when the application starts
mongoose.connect('mongodb+srv://priyadarshanpradhanrinku:Rinku9668@cluster0.xwc5t31.mongodb.net/notedb')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Route to fetch notes
router.post('/add', async (req, res) => {
    const newnote=new Note({
        id:req.body.id,
        userid:req.body.userid,
        title:req.body.title,
        content:req.body.content,
       })

       await newnote.save();
       const response={'message':'Note Is Added'};
       res.json(response);
});

module.exports = router;
