const express=require('express');
const mongoose=require('mongoose');

const regdschema=mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dateadded:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('registration',regdschema)