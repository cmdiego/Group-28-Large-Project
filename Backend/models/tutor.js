// Tutor Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const tutorSchema = new Schema ({
  firstName: String,
  lastName: String,
  bioBox: String,
  timeSlots: [TimeSlotSchema]       // this will hold the active timeslots of the tutor
});                                 // allows for quicker access than entire timeSlot document

module.exports = mongoose.model('Tutor', tutorSchema);
