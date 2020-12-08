const express = require('express');
const cors = require('cors');

const path = require('path');
const port = process.env.PORT || 5000;

const app = express();

const authRoutes = require("./routes/auth.routes");

app.use(express.json()); 
app.use(cors());

//Allow to use environmental variables 
require('dotenv').config(); 

//Connect to database
require("./database/connection.js");

app.use('/auth', authRoutes); 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
    next(); 
});

if(process.env.NODE_ENV === 'production')
{
    //Set static folder
    app.use(express.static('Frontend/mern-react/build'));

    app.get('*', (req, res)=>
    {
        res.sendFile(path.resolve(__dirname, 'Frontend', 'mern-react', 'build', 'index.html'))
    });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

//done
