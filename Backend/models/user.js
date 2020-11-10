const mongoose = require('mongoose'); 
const crypto = require('crypto'); 

//User Schema 
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true, 
        unique: true,
        lowercase: true 
    }, 
    password:{
        type: String,
        required: true, 
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);