const mongoose = require('mongoose'); 

//***************************User COLLECTION *********************/
//*** defining schemas ********/
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    email: {
        type: String,
        trim: true,
        required: true, 
        unique: true, 
        lowercase: true 
    }, 
    password : String,

    isStudent: Boolean, 
    isTutor: Boolean,

    firstName: {
        type: String,
        trim: true,
        required: true, 
        unique: true,
    }, 
    lastName: {
        type: String,
        trim: true,
        required: true, 
        unique: true,
    }, 
    schoolName: {
        type: String,
        required: true, 
    }, 
    bioBox: String,

    courses: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Courses'
    }, 

}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);