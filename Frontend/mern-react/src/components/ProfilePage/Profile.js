import React, { useState } from 'react';
import './Profile.css';
import download from './download.png';
import PopupEmail from './PopupEmail';
import CourseCards from './CourseCards';
import PopupPassword from './PopupPassword';
const axios = require('axios');


var dummyFname = 'Jon';
var dummyLname = 'Snow';
var dummySchool = 'Nights Watch';
var dummyEmail = 'jonsnow@gmail.com';
var courseCodes = ['COP','COP','CIS','EEL'];
var courseNums = ['4600','4331','4910','3421'];
var flag = false;
var nameList ="";
var bioFromAPI = 'hard coded string but once we get the API just set this equal to it';


const classes = [

    {class: 'COP 4600'},
    {class: 'COP 4331'},
    {class: 'CIS 4940'},
    {class: 'COP 3502'}

]



function getinfo() {
    axios.get('http://localhost:5000/auth/userinfo').then(() => {
        console.log("data received!")
    }).catch(() => {
        alert("Error retrieving data!");  
    })
}

function handleDeleteClick()
{
    alert("this works");

    return;
}

function populate()
{
    if(flag == true )
    {
        return;
    }
    
    const list = document.querySelector('.my-list');

    const listItems = courseCodes.map((element)=>{'<li id= ${element} class = listItem >${element}</li>'});
    flag = true;
    return;
}
    const GoHome = async event =>
    {
        event.preventDefault();
        window.location.href = "/HomePage"; 
        //alert("Shmoovin to profile page");
    };

function BringUpEdit()
{
    var temp = document.getElementById("setupForm").style.display ="none";
    var temp = document.getElementById("editClassForm").style.display ="inline-block";

}


function BacktoProfile()
{
     var temp = document.getElementById("editClassForm").style.display ="none";
     var temp = document.getElementById("setupForm").style.display = "inline-block";
}

function addclasses()
{
    var newdiv = document.createElement('span');
    newdiv.innerHTML = ('<span id= "inner-title"><input type= "text" id="styleText" defaultValue = {thisclass.class} ></input><button id="buttonstyling3">X</button></span>');

    document.getElementById("endOfthis").appendChild(newdiv);
    return;
};

function removeclasses()
{
    this.setState({isDisplayed: false});
}


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
        </div>
        <br/>

        <div id = "bottominfo2">
            
            <lable id = 'FirstyNamey'>Courses</lable>

            <br />

                <ul class = "my-list" title = "Courses"> 
                <li>COP 4600</li>
                    {populate()}
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



            <input id = "buttonstyling" type = "button" value = "Edit Classes" onClick = {BringUpEdit}/>
            <input id = "buttonstyling" type = "button" value = "Back" onClick = {GoHome} />

            </div>


            </form>

            <form id = "editClassForm">
            Edit Courses
            <br />
            <br />
            <br />
            <div id = "courseEditList">

                {classes.map(thisclass => (<div id = "classesListEdit"><input type= "text" id="styleText" defaultValue = {thisclass.class} ></input>
                                             <button id="buttonstyling3" onClick={removeclasses}>X</button></div>))}
                                             <div id ="endOfthis"></div>
            </div>
            
            <input type = "button" id = "buttonstyling2" value = "Add Slot" onClick = {addclasses} />
            <br/>
            <input type = "button" id = "buttonstyling2" value = "Submit Changes" onClick = {BacktoProfile} />
            <input type = "button" id = "buttonstyling2" value = "Cancel" onClick = {BacktoProfile} />


            </form>
        </div>

    );
};
export default Profile;