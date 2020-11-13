// Tutor Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const TutorSchema = new Schema ({
  firstName: String,
  lastName: String,
  bioBox: String,
  timeSlots: [TimeSlotSchema]       // this will hold the active timeslots of the tutor
});                                 // allows for quicker access than entire timeSlot document
