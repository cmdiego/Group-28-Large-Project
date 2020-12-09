const User = require('../models/user');
const Tutor = require('../models/tutor');
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

//Create a User w/ email account verification
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
                          console.log("Error in Changing Password: ", err);
                          return res.status(400), json({error: 'Error Changing Password'})
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
            return res.status(401).json({error: "No email associated with this account"});
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
                    return res.status(402).json({error: "bad password"});;
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
    const isTutorTrue = UserInfo.isTutor;

    //If courses are null, we need to create one, and then append
    Courses.findOne({listCourse: courses}).exec((err, crse) => {
        if(crse) {
            console.log("Course exists w/ user");
            return res.status(400).json({error: "Course exists w/ user"});
        }
        const userCourses = new Courses({
            listCourse: courses,
            count: count,
            user: UserInfo._id,
            isTutor: isTutorTrue,
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
}
//Tutor Adds Availability Time & automatically add appointment
exports.timeslots = async function(req, res) {
    const { count, dateArray } = req.body;
    const UserInfo = req.user.user;

    Availability.findOne({user: UserInfo._id}).exec((err, avail) => {
        if(avail) {
            console.log("Duplicate Time Availability");
            return res.status(400).json({error: "Duplicate Time Availability"});
        }
        const tutorAvail = new Availability({
            date: dateArray,
            user: UserInfo._id
        });
        console.log(tutorAvail.date);

        tutorAvail.save(function(err) {
            if(err){
                console.log("Error: " + err);
            }
        return res.sendStatus(200);
        //Create Appointment
        /*    Appointment.findOne({user: UserInfo._id}).exec((err, app) => {
                console.log("Availability Added!");
               if(app) {
                   console.log("Existing appointment");
               }
               let tutorName = UserInfo.firstName + " " + UserInfo.lastName;

               const appt = new Appointment({
                   isOccupied: false,
                   tutor: tutorName,
                   time: dateArray,
                   user: UserInfo._id,
               });

               appt.save(function(err) {
                if(err){
                    console.log("Error: " + err);
                }

                    return res.sendStatus(200);
            })
        })*/
    })
    })
}
//For Profile Page Info
exports.getUserInfo = async function(req, res) {
    const UserInfo = req.user.user;

    const firstName = UserInfo.firstName;
    const lastName = UserInfo.lastName;
    const schoolName = UserInfo.schoolName;
    const email = UserInfo.email;
    //const bioBox = UserInfo.bioBox;

    console.log("First Name: " + firstName);
    console.log("Last Name: " + lastName);
    console.log("School: " + schoolName);
    console.log("Email: " + email);

    //Display list of courses
    Courses.findOne({user: UserInfo._id}).exec((err, crse) => {
        let courses = crse.listCourse;
        if(!courses) {
            console.log("No course exist w/ user");
            return res.status(400).json({error: "No course exist w/ user"});
        }

        User.findOne({_id: UserInfo._id}).exec((err, bio) => {
            let bioBox = bio.bioBox;

        return res.json({ firstName, lastName, schoolName, email, courses, bioBox});

      })
    })
}
//For Tutor Profile Page Info
exports.getTutorProfile = async function(req, res) {
    const UserInfo = req.user.user;

    const firstName = UserInfo.firstName;
    const lastName = UserInfo.lastName;
    const schoolName = UserInfo.schoolName;
    const email = UserInfo.email;
    //const bioBox = UserInfo.bioBox;

    console.log("First Name: " + firstName);
    console.log("Last Name: " + lastName);
    console.log("School: " + schoolName);
    console.log("Email: " + email);

    //Display list of courses
    Courses.findOne({user: UserInfo._id}).exec((err, crse) => {
        let courses = crse.listCourse;
        if(!courses) {
            console.log("No course exist w/ user");
            return res.status(400).json({error: "No course exist w/ user"});
        }

        User.findOne({_id: UserInfo._id}).exec((err, bio) => {
            let bioBox = bio.bioBox;

        Availability.findOne({user: UserInfo._id}).exec((err, avail) => {
                let time = avail.date;

                /*
                    if(avail.date === null) {
                        let time = " ";

                    }
                else {

                    //for loop
                }

                */
                for(let i = 0; i < time.length; i++) {
                    time[i] = time[i].toLocaleDateString() + " " +time[(i)].toLocaleTimeString();
                }

            return res.json({ firstName, lastName, schoolName, email, courses, time, bioBox});
        })
      })
    })
}
//Directs User to the Correct Profile Page - Student or Tutor
exports.profileDirect = async function(req, res) {
    const UserInfo = req.user.user;
    const isStudent = UserInfo.isStudent;
    const isTutor = UserInfo.isTutor;

    return res.json({ isStudent, isTutor});
}
//User Modifies Bio Box
exports.modifyBioBox = async function(req, res) {
    const UserInfo = req.user.user;
    const { oo } = req.body;
    console.log("New Bio Box: " + oo);
    User.findByIdAndUpdate(UserInfo._id, {
        $set: {
            bioBox: oo
        }
    },
    function(err, success) {
         if(err) {
             console.log("Error in changing bio box: ", err);
             return res.status(400).json({error: 'Error in bio box'})
        }
         console.log("BioBox Updated!");
        return res.status(200).json("BioBox Updated");
    });
}
//User Changes Password API
exports.changePassword = async function(req, res) {
    const UserInfo = req.user.user;
    const { pass1 } = req.body;
    const email  = UserInfo.email;
    console.log("Password: " + pass1);
    console.log(email);
         User.findOne({email}).exec((err, user) => {
            if(!user) {
                console.log("User doesn't exists");
                return res.status(400).json({error: "User doesn't exists"});
            }
            //Hash the password into DB
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(pass1, salt, function(err, hash) {
                    User.findByIdAndUpdate(UserInfo._id, {
                            $set: {
                                password: hash
                            }
                        },
                    function(err, success) {
                        if(err) {
                          console.log("Error in changing passwords: ", err);
                          return res.status(400).json({error: 'Error in changing passwords'})
                        }
                         console.log("Password Updated!");
                        return res.status(200).json("Password Changed Successs");
                    });
               });
            });
        });
}

exports.modifyCourses = async function(req, res) {
    const UserInfo = req.user.user;
    const { courses, count } = req.body;
    console.log(courses);
    Courses.findOneAndUpdate({user: UserInfo._id}, {
        $set: {
            listCourse: courses,
            count: count
        }
    },
    function(err, success) {
        console.log("User info ID: " + UserInfo._id);

         if(err) {
             console.log(success)
             console.log("Error in adding courses: " + err);
             return res.status(400).json({error: 'Error in adding courses'})
        }
         console.log("Adding Courses Updated!");
        return res.status(200).json("Adding Courses Updated");
    });
}

exports.modifyAvailability = async function(req, res) {
    const { editArray } = req.body;
    const UserInfo = req.user.user;

    console.log(editArray);
    //This is an API for updating the user courses
    Availability.findOneAndUpdate({user: UserInfo._id}, {
        $set: {
            date: editArray,
        }
    },
    function(err, success) {
         if(err) {
             console.log(success)
             console.log("Error in adding timeslots: " + err);
             return res.status(400).json({error: 'Error in adding timeslots'})
        }
         console.log("Adding Timeslots Updated!");
        return res.status(200).json("Adding Timeslots Updated");
    });

}

exports.getCourse = async function(req, res) {
    const UserInfo = req.user.user;

    Courses.findOne({user: UserInfo._id}).exec((err, crse) => {
        let courses = crse.listCourse;
        if(!courses) {
            console.log("No course exist w/ user");
            return res.status(400).json({error: "No course exist w/ user"});
        }
        return res.json({courses});
    })

}

exports.checkUserTutorCourse = async function(req, res)
{
    const { studentCourse } = req.body;

    //Search through the database and look for only tutors that have the same course the student requests
     return Courses.find({$and: [{isTutor: true}, {listCourse: studentCourse}]}).exec(async function (err, tut) {
       //Error while searching
        if(err) {
            console.log("Error: " + err);
        }

        console.log("Print out Tutor Object");
        console.log(tut);
        //Returns Tutor Object
        return res.json({tut});

    }) //Ends: Searching through Tutor
}
//Grabs a list of tutor information
exports.getTutorInfo = async function(req, res){
  const  { tempID } = req.body;
  console.log("TutorID: " + tempID);
   User.findById({_id: tempID}, async function(err, succ) {
       let fName = succ.firstName;
       let lName = succ.lastName;
       let tEmail = succ.email;

       let tutorinfo = {
           firstName: fName,
           lastName: lName,
           email: tEmail,
       }
       console.log("TutorInfo: " + tutorinfo);
       return res.json(tutorinfo);
   });
}

exports.getTutorAvailability = async function(req, res){
  const  { tempID } = req.body;
  Availability.find({user: tempID}, async function(err, suc1) {
      console.log("suc1");
      console.log(suc1);
      let dt = {date: suc1[0].date};
      console.log("dt: "+ dt.date);
      return res.json(dt);
  });
}

//Create Appointment
exports.createAppointment = async function(req, res) {
    const StudentInfo = req.user.user;
    const StudentID = StudentInfo._id;
    const StudentName = StudentInfo.firstName + " " + StudentInfo.lastName;
    const StudentEmail = StudentInfo.email;
                             //Specific Date                  //List of Tutor Dates
    const {tutorID, courseName, dateObj, tutorName, tutorEmail} = req.body;
      //Create Appointment
       Appointment.findOne({student: StudentID}).exec((err, appointment) => {
              if(appointment) {
                   console.log("Existing appointment");
               }
               const appt = new Appointment({
                   course: courseName,
                   tutorName: tutorName,
                   studentName: StudentName,
                   time: dateObj,
                   studentEmail: StudentEmail,
                   tutorEmail: tutorEmail,
                   tutor: tutorID,
                   student: StudentID
               });
               //Save Appointment Object to DB
               appt.save(function(err) {
                if(err){
                    console.log("Error: " + err);
                }

                Availability.updateOne({user: tutorID}, {$pull: {'date': dateObj}}, function(err, success) {
                     if(err) {
                         console.log("Error in TutorAvail: " + err);
                         return res.status(400).json({error: 'Error in TutorAvail:'})
                    }

                     console.log("Updating Avail: " + success);
                    return res.status(200).json("Updating Avail");
                });
            })
        })


}

//Fetch Appointment
exports.getAppointment = async function(req, res) {
    const UserInfo = req.user.user;
    const UserID = UserInfo._id;
    const studentTrue = UserInfo.isStudent;
    const tutorTrue = UserInfo.isTutor;

    //If Student is True
    if(studentTrue) {
        Appointment.find({student: UserID}).exec((err, appt) => {
            if(!appt) {
                console.log("Appointment doesn't exists!");
                return res.sendStatus(400).json("Appointment doesn't exists!");
            }

            console.log("Appointment: " + appt);

            return res.json({appt});
        })
    }
    //If Tutor is True
    if(tutorTrue) {
        Appointment.find({tutor: UserID}).exec((err, appt) => {
            if(!appt) {
                console.log("Appointment doesn't exists!");
                return res.sendStatus(400).json("Appointment doesn't exists!");
            }

            console.log("Appointment: " + appt);

            return res.json({appt});
        })
    }
}

exports.cancelAppointment = async function(req, res) {
    const UserInfo = req.user.user;
    const UserID = UserInfo._id;
    const studentTrue = UserInfo.isStudent;
    const tutorTrue = UserInfo.isTutor;
    const { apptID, tutorID, dateObj } = req.body;


    Appointment.remove({_id: apptID}, function(err, success) {
        if (err) {
            console.log("Err: " + err);
        }
        console.log ("Appointment Deleted?: " + success);
    })

    Availability.updateOne({user: tutorID}, {$push: {'date': dateObj}}, function(err, success) {
        if (err) {
            console.log("Error in AppDel: " + err);
            return res.status(400).json({error: 'Error in TutorAvail:'})
        }
        console.log("Updating AppDel: " + success);
        return res.status(200).json("Updating Avail");
    });
     //If Student is True
     /*
     if(studentTrue) {
        Appointment.remove({student: UserID},function(err, success) {
            if(!appt) {
                console.log("Appointment doesn't exists!");
                return res.sendStatus(400).json("Appointment doesn't exists!");
            }

            console.log("Appointment Deleted?: " + success);
        })
    }
    //If Tutor is True
    if(tutorTrue) {
        Appointment.remove({tutor: UserID},function(err, success) {
            if(!appt) {
                console.log("Appointment doesn't exists!");
                return res.sendStatus(400).json("Appointment doesn't exists!");
            }
            console.log("Appointment Deleted?: " + success);
        })
    }
    */
}
