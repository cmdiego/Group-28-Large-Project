import React, {Component, useState } from 'react';
import './Profile.css';
import download from './download.png';
import {useParams}  from "react-router-dom";
import axios from "axios"; 
import PopupEmail from './PopupEmail';
import PopupPassword from './PopupPassword';

var dummyFname = 'Jon';
var dummyLname = 'Snow';
var dummySchool = 'Nights Watch';
var dummyEmail = 'jonsnow@gmail.com';
var bioFromAPI = 'hard coded string but once we get the API just set this equal to it';

/*need API to send a File like this*/
const classes = [

    {class: 'COP 4600'},
    {class: 'COP 4331'},
    {class: 'CIS 4940'},
    {class: 'COP 3502'}

]

function Profile()
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

    const submitnewEmail = async event =>
    {
        var email1 = document.getElementById("newEmail").value;
        var email2 = document.getElementById("confirmNewEmail").value;

        if(email1 != email2)
            alert("password not matching");

        else
            alert("they match");

    }


    return(
        <div id="Profileinformation">
           
            <form  id = "setupForm">
                <div id = "form1">
                <br />
                <br />
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
                
                
                <span id ="CoursesLable">Courses:</span>

                <br />
                {classes.map(thisclass => (<p>{thisclass.class}</p>))}
                

            </div>
            <br/>
            <div id = "bottominfo3">
                
                
                <span id ="CoursesLable">Bio:</span>
                <br/>
                <textarea>{bioFromAPI}</textarea>
                <input type = "button" id="saveNewBio" class="buttons" value="Save Changes" onClick={saveBioChange}/>

            </div>

            <input id = "buttonstyling" type = "button" value = "Update Email" onClick ={togglePopup}/>

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


            <input id = "buttonstyling" type = "button" value = "Update password" onClick={togglePopup2}/>
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
            <button id = "popuButton">Cancle</button>
            </>}
            handleClose={togglePopup2}
            />}



            <input id = "buttonstyling" type = "button" value = "Edit Classes"/>
            <input id = "buttonstyling" type = "button" value = "Back" />
            
            </div>

                    
                </form>
        </div>
    );
};


export default Profile;