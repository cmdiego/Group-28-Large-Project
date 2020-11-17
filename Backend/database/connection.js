const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => console.log("Database connection established!"))
.catch(err => console.log("Database connection error: ", err));
