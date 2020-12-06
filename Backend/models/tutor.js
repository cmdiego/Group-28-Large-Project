const mongoose = require('mongoose'); 

//**************** Tutor Collection ***********************
//*** defining schemas ********/

const tutorSchema = new mongoose.Schema({
    availability : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Availability'
    }, 
    schedule : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Appointments'
    },
    classes : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Courses'
    },
});

module.exports = mongoose.model('Tutor', tutorSchema);