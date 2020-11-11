//User Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true
  },
  password:{
    type: String,
    trim: true,
    required: true
  },
  isStudent:{
    type: Boolean,
    required: true
  }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
