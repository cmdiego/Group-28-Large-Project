const mongoose = require('mongoose'); 

//**************** Availability Collection ***********************
//*** defining schemas ********/
const availabilitySchema = new mongoose.Schema({
    day: Date,
    time: String,
    tutor: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tutor'
    },
});

module.exports = mongoose.model('Availability', availabilitySchema);