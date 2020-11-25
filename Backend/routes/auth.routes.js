const express = require("express"); 
const router = express.Router(); 
//Import controller of signup 
const {signup, signin, requestPassword, resetPassword, activateAccount, courseSetup, getUserInfo} = require("../controllers/auth.controller");

//API Endpoint for localhost:5000/signup directed to the signup method
router.post('/signup', signup); 
router.post('/signin', signin); 
router.post('/request-password', requestPassword); 
router.post('/reset-password', resetPassword); 
router.post('/email-activate', activateAccount); 
router.post('/addcourse', courseSetup);
router.get('/userinfo', getUserInfo);
//Export features for other to transfer
module.exports = router; 