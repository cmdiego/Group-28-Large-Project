// TimeSlot Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const timeSlotSchema = new Schema ({
  date: Date,
  tutorID: String,       // ID's may not be strings, may need to be changed
  studentID: String,
  courseID: Number
});

module.exports = mongoose.model('TimeSlot', timeslotSchema);
