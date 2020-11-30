import React, { useState } from 'react';
import './Profile.css';
import download from './download.png';
import PopupEmail from './PopupEmail';
import PopupPassword from './PopupPassword';
const axios = require('axios');


var dummyFname = 'Tutor';
var dummyLname = 'Snow';
var dummySchool = 'Nights Watch';
var dummyEmail = 'jonsnow@gmail.com';
var bioFromAPI = 'String from DB';



function TutorProfile()
{

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);


    const togglePopup = () =>
    {

        setIsOpen(!isOpen);

    }

    const togglePopup2 = () =>
    {
      setIsOpen2(!isOpen);
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
           
            <form  id = "setupForm2">
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
                <textarea>{bioFromAPI}</textarea>
                <input type = "button" id="saveNewBio" class="buttons" value="Save Changes" onClick={saveBioChange}/>

            </div>

            <input id = "buttonstyling4" type = "button" value = "Update Email" onClick ={togglePopup}/>

            {isOpen && <PopupEmail
            content={<>
            <b>Update Email</b>
            <br/>
            <br/>
            <input type="email" id="newEmail" placeholder = "New Email"/>
            <br/>
            <input type="email" id="confirmNewEmail" placeholder = "Confirm Email"/>
            <br/>
            <button id = "popuButton" onClick ={submitnewEmail}>Submit</button>
             <div class ="divider"/>
            <button id = "popuButton">Cancle</button>
            </>}
            handleClose={togglePopup}
            />}


            <input id = "buttonstyling4" type = "button" value = "Update password" onClick={togglePopup2}/>
            {isOpen2 && <PopupPassword
            content={<>
            <b>Update Password</b>
            <br/>
            <br/>
            <input type="text" id="newPass" placeholder = "New Password"/>
            <br/>
            <input type="text" id="confirmNewPass" placeholder = "Confirm Password"/>
            <br/>
            <button id = "popuButton" onClick = {submitnewPass}>Submit</button>
             <div class ="divider"/>
            <button id = "popuButton">Cancle</button></>}handleClose={togglePopup2}/>}


            <input id = "buttonstyling4" type = "button" value = "Update Schedule"  />
            <input id = "buttonstyling4" type = "button" value = "Back" onClick = {GoHome} />

            </div>
            </form>


        </div>

    );
};
export default TutorProfile;