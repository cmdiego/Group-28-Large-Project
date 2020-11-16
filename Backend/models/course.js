// Course Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const courseSchema = new Schema ({
  id: Number,
  subjectCode: {type: String. uppercase: true},     // only ever 3 letters
  courseCode: Number
});

module.exports = mongoose.model('Course', courseSchema);
