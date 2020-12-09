const express = require("express");
const router = express.Router();
const {addTimeslot, removeTimeslot, setTimeslot, getAppointments, getTimeslots} = require("../controllers/timeslot.controller");

// skeleton for api, talked with eduardo and tristan about these
/*
timeslot({
  course: strings (course name: COP3400)
  Tutor({
    firstName: string
    lastName: string
  })
  date: Date
})

 */


router.post('/add', addTimeslot);
// is this supposed to be a post?
router.post('/delete', removeTimeslot);
router.post('/set', setTimeslot);
router.post('/appointments', getAppointments);
router.post('/search', getTimeslots);

module.exports = router;
