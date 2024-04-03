const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Regd=require('./Registration');
// Connect to MongoDB when the application starts
mongoose.connect('mongodb+srv://priyadarshanpradhanrinku:Rinku9668@cluster0.xwc5t31.mongodb.net/notedb')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Route to fetch notes
router.post('/regd', async (req, res) => {
    const regdd=new Regd({
        userid:req.body.userid,
        password:req.body.password
    })

    await regdd.save();
    const response={'message':'Registration Sucessfully'};
    res.json(response);
});

module.exports = router;
