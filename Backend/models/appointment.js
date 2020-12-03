const mongoose = require('mongoose'); 

//**************** Appointment / Time slot Collection ***********************
//*** defining schemas ********/
const appointmentSchema = new mongoose.Schema({
    class: String,
    tutor: String,
    student: String,
    time: String,
    rating : Number,
    availability: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Availability'
    }, 
});

module.exports = mongoose.model('Appointment', appointmentSchema);
