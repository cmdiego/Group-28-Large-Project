// Using the objects below!
const express = require('express');// middle-wear
const bodyParser = require('body-parser');// parsing the html
const cors = require('cors');
const mongoose = require('mongoose');
//const { string } = require('prop-types');
//const { SourceMap } = require('module');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

//*************** CONNECTING TO MONGODB **********/
//const MongoClient = require('mongodb').MongoClient;
//password Popgame1
const url = 'mongodb+srv://LargeProject:Popgame1@cluster0.l32tu.mongodb.net/<dbname>?retryWrites=true&w=majority';
//const client = new MongoClient(url);
//client.connect({useNewUrlParser : true, useUnifiedTopology : true});
//*************** CONNECTION TO MONGO DB ENDED *****************/

//********* Mongoose connection ********/
mongoose.connect(url || 'mongodb://localhost/LargeProject',{useNewUrlParser : true, useUnifiedTopology : true});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!');
});
//***********Mongoose connection end******/

app.use((req, res, next) =>
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.listen(5000); // start Node + Express server on port 5000
