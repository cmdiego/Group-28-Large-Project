const mongoose = require('mongoose');

//**************** Appointment / Time slot Collection ***********************
//*** defining schemas ********/
const appointmentSchema = new mongoose.Schema({
    course: String,
    tutorEmail: String,
    studentEmail: String,
    date: Date,
    rating : Number,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
