const mongoose = require('mongoose'); 

//**************** Availability Collection ***********************
//*** defining schemas ********/
const availabilitySchema = new mongoose.Schema({
    day: String,
    time: String,
});

module.exports = mongoose.model('Availability', availabilitySchema);