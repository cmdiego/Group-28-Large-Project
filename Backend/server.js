// Run 'nodemon server' or 'npm start'
const express = require('express'); // middle-wear
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();


app.use(cors());
app.use(express.json());
const port = process.env.PORT;
const uri = process.env.ATLAS_URI;

// connecting ot mongoose
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
// checking connection
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// start Node + Express server on port
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});

//NOTE: Code from professor for connection to web server
// app.use((req, res, next) =>
// {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PATCH, DELETE, OPTIONS'
//   );
//   next();
// });
