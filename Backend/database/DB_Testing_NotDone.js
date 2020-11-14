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
const url = 'mongodb+srv://LargeProject:Popgame1@cluster0.l32tu.mongodb.net/<dbname>?retryWrites=true&w=majority'; // monogdb
//const client = new MongoClient(url);
//client.connect({useNewUrlParser : true, useUnifiedTopology : true});
//*************** CONNECTION TO MONGO DB ENDED *****************/

//********* Mongoose connection ********/
mongoose.connect(url || 'mongodb://localhost/LargeProject',{useNewUrlParser : true, useUnifiedTopology : true});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!');
});
//***********Mongoose connection end******/

//***************************User COLLECTION *********************/
//*** defining schemas ********/
const usersSchema = mongoose.Schema;
const userSchema = new usersSchema({

    username1: {type : String, unique : true},
    password : String,
    isStudent : Boolean,
    isTutor : Boolean,
});

//Model 
const User = mongoose.model('Users', userSchema);

const Userdata = {

    username1: 'Daw10@gmail.com',
    password : 'Popgame1!',
    isStudent: 'false',
    isTutor : 'true',
};

const newUser = new User(Userdata);

newUser.save((error) => {
    if(error)
    {
        console.log(error);
    }
    else{
        console.log('User Data has been saved!!');
    }
    
});

//**************** Appointment / Time slot Collection ***********************
//*** defining schemas ********/
const appointSchema = mongoose.Schema;
const aptSchema = new appointSchema({

    class: String,
    tutor: String,
    student: String,
    time: String,
    rating : Number,
});

//Model 
const apt = mongoose.model('Appoitments', aptSchema);

const aptdata = {

    class: 'cop4600',
    tutor: 'Alex',
    student: 'Tom',
    time: '2PM EST',
    rating : 4,
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

// //**************** Availability Collection ***********************
// //*** defining schemas ********/
// const avalSchema = mongoose.Schema;
// const avaliSchema = new avalSchema({

//     day: String,
//     time: String,
// });

// //Model 
// const aval = mongoose.model('Availability', avaliSchema);

// const avaldata = {

//     day: 'Monday',
//     time: '2 PM',
// };

// const newAval = new aval(avaldata);

// newAval.save((error) => {
//     if(error)
//     {
//         console.log(error);
//     }
//     else{
//         console.log('Availability Data has been saved!!');
//     }
// });

//**************** Course Collection ***********************
//*** defining schemas ********/
const courseSchema = mongoose.Schema;
const coursesSchema = new courseSchema({

    subjectCode : String,
    courseNumber : Number,
    school : String,
});

//Model 
const course = mongoose.model('Course', coursesSchema);

const coursedata = {

    subjectCode: 'adf',
    couseNumber: 4600,
    school: 'UCF',
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

//***************************STUDENT COLLECTION *********************/
//*** defining schemas ********/
const Schema = mongoose.Schema;
const StudentSchema = new Schema({

    username1: {type : String, unique : true},
    firstName: String,
    lastName: String,
    school : String,
    bioBox: String,
    classes : {type : Schema.Types.ObjectId, ref : 'Course'},

});

//Model 
const Student = mongoose.model('Student', StudentSchema);

const data = {

    username1: 'gagagafq',
    firstName: 'Jay',
    lastName: 'Patel',
    bioBox: 'idk something',
    tutor : 'checkIfTrueOrFalse',
    classes : new course ({
        subjectCode: 'adf',
        couseNumber: 4600,
        school: 'UCF',
    })
};

const newStudent = new Student(data);

newStudent.save((error) => {
    if(error)
    {
        console.log(error);
    }
    else{
        console.log('Student Data has been saved!!');
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
    schedule : {type : Schema.Types.ObjectId, ref : 'Appointments'},
    class : {type : Schema.Types.ObjectId, ref : 'Course'},
});

//Model 
const Tutor = mongoose.model('Tutor', TutorSchema);

const Tdata = {

    username1: 'jayTheTutor123@gmail.com',
    firstName: 'JayMathGod',
    lastName: 'TheLordOfMathematics',
    bioBox: '2+2 = 22',
    schedule : new apt ({

        class: 'cop4600',
        tutor: 'Alex',
        student: 'Tom',
        time: '2PM EST',
        rating : 4,

    }),
    class : new course ({

        subjectCode: 'adf',
        couseNumber: 4600,
        school: 'UCF',

    })
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
