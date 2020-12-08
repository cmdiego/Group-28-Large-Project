const mongoose = require('mongoose'); 

//**************** Tutor Collection ***********************
//*** defining schemas ********/

const tutorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true, 
    }, 
    lastName: {
        type: String,
        trim: true,
        required: true, 
    }, 
    email: {
        type: String,
        trim: true,
        required: true, 
    }, 
    date: [Date],
    listCourse: [String]
    //First Name,
    //Last name,
    //Email,
    //Avail dates,
    //Courses,
});

module.exports = mongoose.model('Tutor', tutorSchema);