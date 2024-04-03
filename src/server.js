const express=require('express');
const mongoose=require('mongoose');
const app=express();

const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const Note=require('./Note');

const Regd=require('./Registration')


 mongoose.connect('mongodb+srv://priyadarshanpradhanrinku:Rinku9668@cluster0.xwc5t31.mongodb.net/notedb').then(function () {
    
    app.get('/',function(req,res)
    {
        res.send('This Is My Home Page');
    });

    app.get('/notes/list/:userid',async function(req,res){
        var notes=await Note.find({userid:req.params.userid});
        res.json(notes);
    });

    app.get('/notes/list',async function(req,res){
        var notes=await Note.find();
        res.json(notes);
    });

    app.post('/notes/add',async function(req,res){
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

    app.post('/notes/regd',async function(req,res){
        const regdd=new Regd({
            userid:req.body.userid,
            password:req.body.password
        })
 
        await regdd.save();
        const response={'message':'Registration Sucessfully'};
        res.json(response);
     });

     app.get('/notes/delete/:id', async function (req, res) {
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

    app.get('/notes/delete/user/:userid',async function(req,res){
        try {
            const deletenote=await Note.findOneAndDelete({userid:req.params.userid}); 
            if (deletenote) {
                res.json({message:'Note Is Deleted'});
            } else {
                res.json({message:'No Data Found'});
            }
        } catch (error) {
            res.json({message:error.message});
        }
    })

    app.post('/notes/update', async function (req, res) {
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
    
    

 });


const PORT=process.env.PORT||5000
app.listen(PORT,function () {
    console.log("Server Is Running At Port Number ",PORT);
});
