const express = require('express');
const cors = require('cors');

//Allow to use environmental variables
require('dotenv').config();

//Connect to database
require("./database/connection.js");

const app = express();

const authRoutes = require("./routes/auth.routes");
const timeslotRoutes = require("./routes/timeslot.routes");
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
    next();
});
app.use('/auth', authRoutes);
app.use('/timeslot', timeslotRoutes);
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
