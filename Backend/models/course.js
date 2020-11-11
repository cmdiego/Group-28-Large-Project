// Course Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CourseSchema = new Schema ({
  id: Number,
  subjectCode: {type: String. uppercase: true},     // only ever 3 letters
  courseCode: Number
});
