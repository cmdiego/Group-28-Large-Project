//Student Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const StudentSchema = new Schema({
  username: {type : String, unique : true},
  firstName: String,
  lastName: String,
  bioBox: String,
}, {timestamps: true});
