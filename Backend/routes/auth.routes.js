const express = require("express"); 
const router = express.Router(); 
//Import controller of signup 
const {signup, signin, requestPassword, authenticateToken, resetPassword, activateAccount, courseSetup, timeslots,  
    getUserInfo, modifyBioBox, changePassword , profileDirect, modifyCourses, 
    modifyAvailability, getTutorProfile, getCourse, checkUserTutorCourse } = require("../controllers/auth.controller");

//API Endpoint for localhost:5000/signup directed to the signup method
router.post('/signup', signup); 
router.post('/signin', signin); 
router.post('/request-password', requestPassword); 
router.post('/reset-password', resetPassword); 
router.post('/email-activate', activateAccount); 
router.post('/addcourse', authenticateToken, courseSetup);
router.post('/timeslots', authenticateToken, timeslots); 
router.get('/userinfo', authenticateToken, getUserInfo);
router.get('/tutorProfile', authenticateToken, getTutorProfile);
router.get('/profile', authenticateToken, profileDirect);
router.post('/bioBox', authenticateToken, modifyBioBox);
router.post('/changePassword', authenticateToken, changePassword);
router.post('/modifyCourses', authenticateToken, modifyCourses); 
router.post('/modifyAvailability', authenticateToken, modifyAvailability);
router.get('/getCourse', authenticateToken, getCourse);
router.post('/checkUserTutorCourse', authenticateToken, checkUserTutorCourse )
//Export features for other to transfer
module.exports = router; 