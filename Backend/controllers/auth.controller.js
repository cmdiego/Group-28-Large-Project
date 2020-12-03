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
                 Click <a href=${CLIENT_URL}/authentication/email-activate/${token}> here</a> to finish the registration.
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
                 Click <a href=${CLIENT_URL}/reset-password/${token}> here</a> to change password
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
                  try {
                    const accessToken =  jwt.sign({user}, process.env.SECRET_KEY); 
                    return res.status(200).json({
                        accessToken
                    }); 
                } catch(err) {
                     console.log("Error: " + err); 
                 }
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
                        let user = new User({
                            "email": email, 
                            "password": hash, 
                            "isStudent": student, 
                            "isTutor": tutor, 
                            "firstName": firstName, 
                            "lastName": lastName, 
                            "schoolName": schoolName,
                            "bioBox": bioBox
                        });
                        
                        user.save((err, success) => {
                            if(err) {
                              console.log("Error in signup while account activation: ", err);
                              return res.status(400), json({error: 'Error activating account'})
                            }
                            else {
                                console.log("Sign up success! "); 
                            }
                         });
                         try {
                            const accessToken =  jwt.sign({user}, process.env.SECRET_KEY); 
                            return res.status(201).json({
                                accessToken
                            }); 
                        } catch(err) {
                             console.log("Error: " + err); 
                         }
                    });
                });
            });
        })
    } else {
        return res.json({error: "Something went wrong!"});
    }
}
//Authorization: userId token 
//Extract reference from current user and update array on the dataset 
exports.authenticateToken = function(req, res, next) {
    const token = req.headers['authorization']; 
    //const token = authHeader && authHeader.split(' ')[1]; 
    if(!token) {
        console.log("No token exists!"); //Boot to signup page
        return res.sendStatus(401); 
    }
    
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) {
            console.log("Error: " + err); //Boot to signup page
            return res.sendStatus(403); 
        }
        req.user = user; 
        next();
    })
}
//User Adds Courses 
exports.courseSetup =  async function (req, res) {
    const { count, courses } = req.body; 
    const UserInfo = req.user.user; 

    //If courses are null, we need to create one, and then append 
    Courses.findOne({listCourse: courses}).exec((err, crse) => {
        if(crse) {
            console.log("Course exists w/ user");
            return res.status(400).json({error: "Course exists w/ user"});
        }
        const userCourses = new Courses({
            listCourse: courses, 
            count: count,
            user: UserInfo._id
        });
        userCourses.save(function(err) {
            if(err){
                console.log("Error: " + err);
            }  
            console.log("Courses Added!"); 
        })

        //Determine if student or tutor 
        if(UserInfo.isTutor) {
            return res.sendStatus(201);
        }
        else if(UserInfo.isStudent) {
            return res.sendStatus(202); 
        }
    })

        //This is an API for updating the user courses
        /*
        We need to search through if exist
        Grab the updated amount of courses
        let s =  await Courses.findOneAndUpdate({user: UserInfo._id}, {$push:{listCourse: courses}} , { upsert: true, new: true, returnNewDocument: true }); 
        try {
            console.log(s); 
            await s.save(); 
        } catch( err ) {
            console.log("Some bullshit error: " + err); 
        }*/

        /*Courses.findOne({listCourse: courses}).exec((err, crse) => {
            if(crse) {
                console.log("Course exists w/ user");
                return res.status(400).json({error: "Course exists w/ user"});
            }
            const userCourses = new Courses({
                listCourse: courses, 
                count: count,
                user: UserInfo._id
            });
            userCourses.save(function(err) {
                if(err){
                    console.log("Error: " + err);
                }  
                console.log("Courses Added!"); 
            })
            if(UserInfo.isTutor) {
                return res.sendStatus(201);
            }
            else if(UserInfo.isStudent) {
                return res.sendStatus(202); 
            }
        })*/
    //1. Search through list of courses from user and see if it already exists
        //1a. If the course exists: Result "Course already added"
         //1b. If not: Result "Save the Course to the User " 

            //Create a list of courses 
         /*   const userCourses = new Courses({
                listCourse: courses, 
                count: count,
                user: newUser.id
            });
            
            //Save it to database 
            userCourses.save(function(err) {
                if(err) console.log(err); 
                return res.status(200).json("Adding Courses success!");
            })*/

             
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
//For profile page info
exports.getUserInfo = async function(req, res) {  
    const UserInfo = req.user.user; 

    const firstName = UserInfo.firstName;
    const lastName = UserInfo.lastName;
    const schoolName = UserInfo.schoolName;
    const email = UserInfo.email; 
    const bioBox = UserInfo.bioBox;

    console.log("First Name: " + firstName);
    console.log("Last Name: " + lastName);
    console.log("School: " + schoolName);
    console.log("Email: " + email);
    console.log("BioBox: " + bioBox);

   /* Courses.find({ }).exec((err, courses) => {
        let course = courses[0].listCourse;
        return res.json({ firstName, lastName, schoolName, email, course}); 

    })*/

    Courses.findOne({user: UserInfo._id}).exec((err, crse) => {
        let courses = crse.listCourse; 
        if(!courses) {
            console.log("No course exist w/ user");
            return res.status(400).json({error: "No course exist w/ user"});
        }
        console.log(courses); 
        return res.json({ firstName, lastName, schoolName, email, courses, bioBox}); 

    })

    //let idk = res.user;
    //return res.json({ idk});
}
    /* User.find({ }).then((data) => {
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
    });*/


       