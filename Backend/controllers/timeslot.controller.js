const mongoose = require("mongoose");
const Appointment = require('../models/appointment');
const User = require('../models/user');


export.addTimeslot = async function(req, res) {

  const user = req.user;
  const date = req.date;


  let newTimeslot = new Appointment({
    "tutorEmail": user.email,
    "date": date
  });
  newTimeslot.save(err, success) => {
    if(err) {
      console.log("Error creating a timeslot object in database\n");
      return res.status(400).json({error: "Error saving timeSlot to db"});
    }
    res.json({message: "timeSlot creation successful"});
  }
}


export.removeTimeslot = async function(req, res) {

  // TODO: are we tracking the ID of the timeslot objects?
  // we need to have a way to identify them from the frontend
  const id = req.id; // or whatever will go here

  // also not sure what the value in the db for the identifier will be called
  Appointment.findOne({id: id}, function(err, timeSlot){
    if(err){
      console.log("didn't find a matching appointment with id");
      return res.status(400).json({error: "no matching appointment"});
    }
    timeSlot.studentEmail = "";
    timeSlot.course = "";
    // 'timeSlot.date' connant be set to null
    // but if we always check 'studentEmail' != "" we shouln't have any issues
    timeSlot.save(err, success) => {
      if(err)
      {
        console.log("Error removing timeslot");
        return res.status(400).json({error: "did not remove timeslot correctly"});
      }
      res.json({message: "timeslot removed successfully"});
    };
  });
}


export.setTimeslot = async function(req, res) {

  const user = req.user;
  // again not sure how we are identifying these appointment objects from the frontend
  const id = req.id;
  // also not sure how the course id will be sent
  const course = req.course;

  // again not sure how the identifier is stored in the db
  Appointment.findOne({id: id}, function(err, timeSlot){
    if(err){
      console.log("didn't find a matching appointment with id");
      return res.status(400).json({error: "no matching appointment"});
    }
    timeSlot.studentEmail = user.email;
    timeSlot.course = course;
    timeSlot.save(err, success) => {
      if(err)
      {
        console.log("Error in timeslot setup");
        return res.status(400).json({error: "did not setup timeslot correctly"});
      }
      res.json({message: "timeslot setup successfully"});
    };
  });
}


export.getAppointments = async function(req, res) {
  const user = req.user;
  if(user.isStudent)
  {
    Appointment.find({studentEmail: user.email, date: {$gte: new Date()}}, function(err, timeSlots){
      if(err)
      {
        console.log("Error in getting appointments");
        return res.status(400).json({error: "did not get appointments properly"});
      }
      res.isStudent = true;
      res.appointments = timeSlots;
    });
  }
  else
  {
    Appointment.find({tutorEmail: user.email, date: {$gte: new Date()}}, function(err, timeSlots){
      if(err)
      {
        console.log("Error in getting appointments");
        return res.status(400).json({error: "did not get appointments properly"});
      }
      res.isStudent = false;
      res.appointments = timeSlots;
    });
  }
}

export.getTimeslots = async function(req, res) {
  const course = req.course;
  User.find({isTutor: true}, function(err, users){
    if(err)
    {
      console.log("Error in getting users that are tutors");
      return res.status(400).json({error: "Error in getting users that are tutors"});
    }

  });
  Appointment.find({course: course, student: ""}, function(err, timeSlots){
    if(err){
      console.log("Error in getting timeslots");
      return res.status(400).json({error: "did not get timeslots properly"});
    }
    res.timeSlots = timeSlots;
  });
}
