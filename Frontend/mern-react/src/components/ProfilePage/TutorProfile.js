import React, { useState } from 'react';
import './Profile.css';
import download from './download.png';
const axios = require('axios');


var dummyFname = 'Tutor';
var dummyLname = 'Snow';
var dummySchool = 'Nights Watch';
var dummyEmail = 'jonsnow@gmail.com';
var bioFromAPI = 'String from DB';
var rating =2.5;


function TutorProfile()
{

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);


    function BringUpPass()
    {
        var temp = document.getElementById("setupForm").style.display ="none";
        var temp = document.getElementById("editPassform").style.display ="inline-block";
    }

    function BringUpBio()
    {
        var temp = document.getElementById("setupForm").style.display ="none";
        var temp = document.getElementById("editBioform").style.display ="inline-block";
    }
    function BringupSche()
    {
        var temp = document.getElementById("setupForm").style.display ="none";
        var temp = document.getElementById("editAvaform").style.display ="inline-block";
    }
 
    
    function BacktoProfile2()
    {
        var temp = document.getElementById("editPassform").style.display ="none";
        var temp = document.getElementById("setupForm").style.display = "inline-block";
    }

    function BacktoProfile3()
    {
        var temp = document.getElementById("editBioform").style.display ="none";
        var temp = document.getElementById("setupForm").style.display = "inline-block";
    }

    function BacktoProfile4()
    {
        var temp = document.getElementById("editAvaform").style.display ="none";
        var temp = document.getElementById("setupForm").style.display = "inline-block";
    }

    const saveBioChange= async event =>
    {
        //event.preventDefault();
        alert("Send new bio to database");
    }

    const submitnewPass = async event =>
    {
        var pass1 = document.getElementById("newPass").value;
        var pass2 = document.getElementById("confirmNewPass").value;

        if(pass1 != pass2)
            alert("password not matching");

        else
            alert("they match");
    }
    const GoHome = async event =>
    {
        event.preventDefault();
        window.location.href = "/HomePage"; 
        //alert("Shmoovin to profile page");
    };

    const submitnewEmail = async event =>
    {
        var email1 = document.getElementById("newEmail").value;
        var email2 = document.getElementById("confirmNewEmail").value;

        if(email1 != email2)
            alert("password not matching");

        else
            alert("they match");

    }
    
    /*componentDidMount = () => {
    };*/
    return(
        <div id="Profileinformation">
           
            <form  id = "setupForm">
                <div id = "form1">
                    <span id="topofForm">Account Information</span>
                    <br/>
                    <br/>
                 <img class = "circular--square" src = {download} alt ="Download"/>    
                    <br/>
            
            
        <div id = "bottominfo">
            
            <lable id = 'FirstyNamey'>First Name: {dummyFname}</lable>
            <br />
            <lable id = 'lastName'>Last Name: {dummyLname}</lable>
            <br />
            <lable id = 'schoolName'>School: {dummySchool}</lable>
            <br/>
            <lable id = 'tempEmail'>Email: {dummyEmail}</lable>
            <br/>
            <br/>
            {/*<label id="tutorRatingLable">Tutor Rating:</label>
            <br/>
            <StarRatingComponent 
            name="tutorrating" 
            starCount={5}
            value={rating}
    />*/}
        
            
        </div>
        <br/>

        <div id = "bottominfo2">
            
            <lable id = 'FirstyNamey'>Schedule </lable>

            <br />

                <ul class = "my-list" id ="ScheduleList" title = "Schedule"> 
                <li>12/9/2020 @ 3:00pm with Arya Stark</li>
                </ul>
           

            <br />

        </div>

        <br/>
            <div id = "bottominfo3">


                <span id ="CoursesLable">Bio:</span>
                <br/>
                <br/>
                <text>{bioFromAPI}</text>
                <br/>

            </div>



            <input id = "buttonstyling4" type = "button" value = "Update password" onClick={BringUpPass}/>
            <input id = "buttonstyling4" type = "button" value = "Update Bio" onClick={BringUpBio}/>


            <input id = "buttonstyling4" type = "button" value = "Update Schedule"  onClick = {BringupSche}/>
            <input id = "buttonstyling4" type = "button" value = "Back" onClick = {GoHome} />

            </div>
            </form>

            <form id = "editPassform">
                Update Password
                <br/>
                <br/>
                <input type="password" id="newPass" placeholder = "New Password" class ="password"/>
                <br/>
                <input type="password" id="confirmNewPass" placeholder = "Confirm Password"/>
                
                <br/>
                <input type = "button" id = "buttonstyling2" value = "Submit" onClick = {submitnewPass} />
                <input type = "button" id = "buttonstyling2" value = "Cancel" onClick = {BacktoProfile2} />


            </form>

            <form id = "editBioform">
                Update Bio
                <br/>
                <br/>
                <textarea id="bioText" placeholder = "Bio, tell us a bit about your self" ></textarea>               
                <br/>
                <input type = "button" id = "buttonstyling2" value = "Submit" onClick = {BringUpBio} />
                <input type = "button" id = "buttonstyling2" value = "Cancel" onClick = {BacktoProfile3} />
            </form>

            <form id = "editAvaform">
                 stuffs
                
                <input type = "button" id = "buttonstyling2" value = "Submit" onClick = {submitnewPass} />
                <input type = "button" id = "buttonstyling2" value = "Cancel" onClick = {BacktoProfile4} />
            </form>

        </div>

    );
};
export default TutorProfile;