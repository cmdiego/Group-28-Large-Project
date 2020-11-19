const mongoose = require('mongoose'); 

mongoose.connect(process.env.DB, {
    useNewUrlParser: true, 
    useFindAndModify: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
}).then(() => console.log("Database connection established!"))
.catch(err => console.log("Database connection error: ", err));