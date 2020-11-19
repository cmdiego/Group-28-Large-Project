const express = require("express");
const router = express.Router();

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

module.exports = router;
