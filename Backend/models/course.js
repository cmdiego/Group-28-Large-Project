const mongoose = require('mongoose'); 

//**************** Course Collection ***********************
//*** defining schemas ********/

const coursesSchema = new mongoose.Schema({    
    listCourse: [String], 
    count: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model('Courses', coursesSchema);

//const temp = mongoose.model('Courses', coursesSchema);

/*temp.create({
    subjectCode: "MAC",
    courseNumber: '4345'
})*/

//module.exports = temp;