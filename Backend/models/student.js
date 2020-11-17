//Student Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const studentSchema = new Schema({
  username: {type : String, unique : true},
  firstName: String,
  lastName: String,
  bioBox: String,
}, {timestamps: true});

module.exports = mongoose.model('Student', studentSchema);
