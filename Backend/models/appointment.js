const mongoose = require('mongoose'); 

//**************** Appointment / Time slot Collection ***********************
//*** defining schemas ********/
const appointmentSchema = new mongoose.Schema({
    class: String,
    tutor: String,
    student: String,
    time: [String],
    isOccupied: Boolean,
    //rating : Number,
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
