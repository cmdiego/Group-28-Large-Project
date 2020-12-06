const mongoose = require('mongoose'); 

//**************** Availability Collection ***********************
//*** defining schemas ********/
const availabilitySchema = new mongoose.Schema({
    date: [Date],
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
});

module.exports = mongoose.model('Availability', availabilitySchema);