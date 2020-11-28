const User = require('../models/user');
const Tutor = require('../models/tutor'); 
const Student = require('../models/student'); 
const Courses = require('../models/course'); 
const Availability = require('../models/availability'); 
const Appointment = require('../models/appointment'); 
const mongoose = require("mongoose"); 
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer'); 
const jwt = require('jsonwebtoken'); 
const course = require('../models/course');
const { callbackPromise } = require('nodemailer/lib/shared');
const { db } = require('../models/user');

//Create a user w/ email account verification
exports.signup = async function(req, res) {
    const {email, password, student, tutor} = req.body;
   
    User.findOne({email}).exec((err, user) => {
        if(user) {
            console.log("User w/ this email already exists");
            return res.status(400).json({error: "User w/ this email already exists"});
        }

        let token = jwt.sign({email, password, student, tutor}, process.env.SECRET_KEY);

        let transporter = nodemailer.createTransport({
          service: 'gmail', 
          auth: {
              user: 'tutormasterlearner@gmail.com',
              pass: 'tutormasterlearner@1'
          }
        });
        
       // const CLIENT_URL = 'http://' + req.headers.host;
       const CLIENT_URL = 'http://localhost:3000'

        let mailResponse = {
            from: 'tutormasterlearner@gmail.com',
            to: email,
            subject: 'TutorMaster | Activate Account',
            html: ` 
                 <h2>Thank you, please activate your account on the link below:</h2>
                 <p>${CLIENT_URL}/authentication/email-activate/${token}</p>
                 `
        };

        transporter.sendMail(mailResponse, function(err, info) {
            if(err)
                console.log(err); 
            else
                console.log('Email sent to: ' + email + ', activate your account plz');
        });
    });

    return res.json('Email Sent');
}
//User request to change password
exports.requestPassword = async function(req, res) {
    const {email} = req.body;

    User.findOne({email}).exec((err, user) => {
        if(!user || err) {
            console.log("Email hasn't been registered " + err);
            return res.status(400).json({error: "Email hasn't been registered"});
        }

        const token = jwt.sign({email}, process.env.RESETKEY);

        let transporter = nodemailer.createTransport({
          service: 'gmail', 
          auth: {
              user: 'tutormasterlearner@gmail.com',
              pass: 'tutormasterlearner@1'
          }
        });
        
       // const CLIENT_URL = 'http://' + req.headers.host;
       const CLIENT_URL = 'http://localhost:3000'

        let mailResponse = {
            from: 'tutormasterlearner@gmail.com',
            to: email,
            subject: 'TutorMaster | Reset Password',
            html: ` 
                 <h2>Hello, you request for a password change, click on link below to change password:</h2>
                 <p>${CLIENT_URL}/reset-password/${token}</p>
                 `
        };

        transporter.sendMail(mailResponse, function(err, info) {
            if(err)
                console.log(err); 
            else
                console.log('Email sent to: ' + email + ', activate your account plz');
        });
    });

    return res.json('Email Sent');
}

exports.resetPassword = async function(req, res) {
   const { token } = req.body; 
   if(token) {
        jwt.verify(token, process.env.RESETKEY, function(err, decodedToken) {
          
            if(err) {
               console.log('Incorrect or Expired Link.' + err);
               return res.status(400).json({error: 'Incorrect or Expired Link.'}); 
            }   
         let {password} = req.body;
         const {email} = decodedToken; 
         console.log(email);

         User.findOne({email}).exec((err, user) => {
            if(!user) {
                console.log("User doesn't exists");
                return res.status(400).json({error: "User doesn't exists"});
            }            
            //Hash the password into DB
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    User.findByIdAndUpdate(user._id, {
                            $set: {
                                password: hash
                            }
                        },
                        function(err, success) {
                        if(err) {
                          console.log("Error in signup while account activation: ", err);
                          return res.status(400), json({error: 'Error activating account'})
                        }
                        res.json({ message: "Password Updated!" });
                         console.log("Password Updated!");
                  });
            });
                
            });
        });
        return res; 
    })
    } else {
        return res.json({error: "Something went wrong!"});
    }
}
//User is signed in
exports.signin = async function(req, res) {
    const {email, password} = req.body;
    
    User.findOne({email}).exec((err, user) => {
        if(!user) {
            console.log("No email associated with this account");
            return res.status(400).json({error: "No email associated with this account"});
        }
        else {
            bcrypt.compare(password, user.password, function(err, success) {
                if(success) {
                  console.log("Sign in success!");
                  return res.status(200).json("Login success");
                }
                else {
                    console.log("Incorrect Password!"); 
                }
            });
        }
    });
}
//User Activates Account
exports.activateAccount = async(req, res, next) => {
    const {firstName, lastName, schoolName, bioBox, token } = req.body;

    if(token) {
        jwt.verify(token, process.env.SECRET_KEY, function(err, decodedToken) {
            if(err) {
                console.log('Incorrect or Expired Link.' + err);
                return res.status(400).json({error: 'Incorrect or Expired Link.'}); 
             }   
             let {firstName, lastName, schoolName, bioBox} = req.body;
             const {email, password, student, tutor} = decodedToken; 

             User.findOne({email}).exec((err, user) => {
                if(user) {
                    console.log("User w/ email exists");
                    return res.status(400).json({error: "User w/ this email already exists"});
                }            

                //Hash the password into DB
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(password, salt, function(err, hash) {
                        let newUser = new User({
                            "email": email, 
                            "password": hash, 
                            "isStudent": student, 
                            "isTutor": tutor, 
                            "firstName": firstName, 
                            "lastName": lastName, 
                            "schoolName": schoolName,
                            "bioBox": bioBox
                        });
                        
                        console.log(newUser); 

                        newUser.save((err, success) => {
                            if(err) {
                              console.log("Error in signup while account activation: ", err);
                              return res.status(400), json({error: 'Error activating account'})
                            }
                      });
                });
                    res.json({ message: "Signup Success!" });
                    console.log("Signup Success!");
                });
            });
            return res; 
        })
    } else {
        return res.json({error: "Something went wrong!"});
    }
}

//Authorization: userId token 
//Extract reference from current user and update array on the dataset 

//User Adds Courses 
exports.courseSetup = async function(req, res) {
    const { count, courses } = req.body; 

    //1. Search through list of courses from user and see if it already exists
        //1a. If the course exists: Result "Course already added"
         //1b. If not: Result "Save the Course to the User " 

            //Create a list of courses 
            const userCourses = new Courses({
                listCourse: courses, 
                count: count,
                user: newUser.id
            });
            
            //Save it to database 
            userCourses.save(function(err) {
                if(err) console.log(err); 
                return res.status(200).json("Adding Courses success!");
            })

             
             /*Prints the contents of the users collection:
        mongoose.connection.db.collection("users", function (err, collection) {
            collection.find({}).toArray(function(err, data){
                console.log(data); // it will print your collection data
            })   
        });*/
        
        /*Prints all collections:
        mongoose.connection.db.listCollections().toArray(function (err, names) {
            console.log(names); // [{ name: 'dbname.myCollection' }]
            module.exports.Collection = names;
        });*/
}

exports.getUserInfo = async function(req, res) {
    User.find({ }).then((data) => {
        console.log("User: " + data[0].firstName); 
       return res.json(data); 
    }).catch((error) => {
        console.log("Error: " + error);
    });

    Courses.find({ }).then((data) => {
        console.log("Courses: " + data); 
       return res.json(data); 
    }).catch((error) => {
        console.log("Error: " + error);
    });
}