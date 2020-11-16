// Run 'nodemon server' or 'npm start'
const express = require('express'); // middle-wear
const cors = require('cors');
const app = express();
const authRoutes = require("./routes/auth.routes");
require("./database/connection.js");
require('dotenv').config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.use('/auth', authRoutes);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
    next();
});


// start Node + Express server on port
app.listen(port, () => {
  console.log(`Server is running on port: + ${port}`);
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
