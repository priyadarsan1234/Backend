const express=require('express');
const mongoose=require('mongoose');
const app=express();

const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const Note=require('./Note');

const Regd=require('./Registration')

const fetch = require('./fetch');
const add = require('./add');
const regd = require('./Regd');
const Deleteroute = require('./delete');
const update = require('./Update');


 mongoose.connect('mongodb+srv://priyadarshanpradhanrinku:Rinku9668@cluster0.xwc5t31.mongodb.net/notedb').then(function () {
    
    app.use('/',fetch);
    app.use('/',add);
    app.use('/',regd);
    app.use('/delete',Deleteroute);
    app.use('/',update);

    app.get('/notes/list/:userid',async function(req,res){
        var notes=await Note.find({userid:req.params.userid});
        res.json(notes);
    });


 });


const PORT=process.env.PORT||5000
app.listen(PORT,function () {
    console.log("Server Is Running At Port Number ",PORT);
});




    // app.get('/notes/delete/user/:userid',async function(req,res){
    //     try {
    //         const deletenote=await Note.findOneAndDelete({userid:req.params.userid}); 
    //         if (deletenote) {
    //             res.json({message:'Note Is Deleted'});
    //         } else {
    //             res.json({message:'No Data Found'});
    //         }
    //     } catch (error) {
    //         res.json({message:error.message});
    //     }
    // })

    
    
    