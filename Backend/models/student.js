const mongoose = require('mongoose'); 

//***************************STUDENT COLLECTION *********************/
const studentSchema = new mongoose.Schema({
    classes : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Courses'
    }
});

module.exports = mongoose.model('Student', studentSchema);