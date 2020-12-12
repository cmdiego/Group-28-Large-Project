const mongoose = require('mongoose'); 

//**************** Appointment / Time slot Collection ***********************
//*** defining schemas ********/
const appointmentSchema = new mongoose.Schema({
    course: String,
    tutorName: String,
    studentName: String,
    time: Date,
    studentEmail: String, 
    tutorEmail: String, 
    //rating : Number,
    tutor: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },  
});

module.exports = mongoose.model('Appointment', appointmentSchema);
