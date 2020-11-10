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

//***************************STUDENT COLLECTION *********************/

//*** defining schemas ********/
const Schema = mongoose.Schema;
const StudentSchema = new Schema({

    username1: {type : String, unique : true},
    firstName: String,
    lastName: String,
    bioBox: String,
});

//Model
const Student = mongoose.model('Student', StudentSchema);

const data = {

    username1: 'gagagafq',
    firstName: 'Jay',
    lastName: 'Patel',
    bioBox: 'idk something'
};

const newStudent = new Student(data);

newStudent.save((error) => {
    if(error)
    {
        console.log(error);
    }
    else{
        console.log('Data has been saved!!');
    }
});

//**************** Tutor Collection ***********************
//*** defining schemas ********/
const TSchema = mongoose.Schema;
const TutorSchema = new TSchema({

    username1: {type : String, unique : true},
    firstName: String,
    lastName: String,
    bioBox: String,
});

//Model
const Tutor = mongoose.model('Tutor', TutorSchema);

const Tdata = {

    username1: 'jayTheTutor123@gmail.com',
    firstName: 'JayMathGod',
    lastName: 'TheLordOfMathematics',
    bioBox: '2+2 = 22'
};

const newTutor = new Tutor(Tdata);

newTutor.save((error) => {
    if(error)
    {
        console.log(error);
    }
    else{
        console.log('Tutor Data has been saved!!');
    }
});

//**************** Appointment Collection ***********************
//*** defining schemas ********/
const appointSchema = mongoose.Schema;
const aptSchema = new appointSchema({

    class: String,
    tutor: String,
    student: String,
    time: String,
});

//Model
const apt = mongoose.model('Appoitments', aptSchema);

const aptdata = {

    class: 'cop4600',
    tutor: 'Alex',
    student: 'Tom',
    time: '2PM EST'
};

const newApt = new apt(aptdata);

newApt.save((error) => {
    if(error)
    {
        console.log(error);
    }
    else{
        console.log('Appointment Data has been saved!!');
    }
});

//**************** Availability Collection ***********************
//*** defining schemas ********/
const avalSchema = mongoose.Schema;
const avaliSchema = new avalSchema({

    day: String,
    time: String,
});

//Model
const aval = mongoose.model('Availability', avaliSchema);

const avaldata = {

    day: 'Monday',
    time: '2 PM',
};

const newAval = new aval(avaldata);

newAval.save((error) => {
    if(error)
    {
        console.log(error);
    }
    else{
        console.log('Availability Data has been saved!!');
    }
});

//**************** Course Collection ***********************
//*** defining schemas ********/
const courseSchema = mongoose.Schema;
const coursesSchema = new courseSchema({

    name: String,
    grade: String,
    teacher: String,
});

//Model
const course = mongoose.model('Course', coursesSchema);

const coursedata = {

    name: 'COP4600',
    grade: 'A',
    teacher: 'Boloni',
};

const newCourse = new course(coursedata);

newCourse.save((error) => {
    if(error)
    {
        console.log(error);
    }
    else{
        console.log('Course Data has been saved!!');
    }
});

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
