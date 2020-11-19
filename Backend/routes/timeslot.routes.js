const express = require("express");
const router = express.Router();


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
