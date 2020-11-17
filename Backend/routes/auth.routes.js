const express = require("express");
const router = express.Router();
//Import controller of signup
const {signup, signin, activateAccount} = require("../controllers/user.controller");

//API Endpoint for localhost:5000/signup directed to the signup method
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/email-activate', activateAccount); //.post
//Export features for other to transfer
module.exports = router;
