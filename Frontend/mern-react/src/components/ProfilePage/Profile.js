
import React, { useState, Component } from 'react';
import './Profile.css';
import download from './download.png';
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

var isOpen = false; 
var isOpen2 = false;
var count;

const classes = [
    {class: 'COP 4600'},
    {class: 'COP 4331'},
    {class: 'CIS 4940'},
    {class: 'COP 3502'}
]

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

const GoHome = async event => {
        event.preventDefault();
        window.location.href = "/HomePage"; 
        //alert("Shmoovin to profile page");
};

function toUpper(x) {
    return x.toUpperCase();
}; 

function BringUpEdit()
{
    var temp = document.getElementById("setupForm").style.display ="none";
    var temp = document.getElementById("editClassForm").style.display ="inline-block";
    count = 0;

}

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

function BacktoProfileClass()
{
    var temp = document.getElementById("editClassForm").style.display ="none";
    var temp = document.getElementById("setupForm").style.display = "inline-block";
    window.location.reload();
}

function BacktoProfilePass()
{
    var temp = document.getElementById("editPassform").style.display ="none";
    var temp = document.getElementById("setupForm").style.display = "inline-block";
}

function BacktoProfileBio()
{
    var temp = document.getElementById("editBioform").style.display ="none";
    var temp = document.getElementById("setupForm").style.display = "inline-block";
    window.location.reload();
}

function addclasses()
{
    var newdiv = document.createElement('span');
    count++;
    newdiv.innerHTML = ('<span id= "inner-title"><div id = "class'+(count)+'"><text id ="testhis">Class '+(count+1)+':</text><input type= "text" id="styleText" placeholder = "ex. COP 4331" ></input></div></span>');

    document.getElementById("endOfthis").appendChild(newdiv);
    return;
};

const submitnewBio = async event => {
    try {
       var oo = document.getElementById("boxbio").value; 
   } catch(err) {
       console.log("Error: " + err);
   }
   axios.post('http://localhost:5000/auth/bioBox', {oo}, { headers: {Authorization: localStorage.getItem('jwtToken')}})
       .then(function(resp) {
           console.log(resp);
           if(resp.status == 200) {
               BacktoProfileBio();
           } 
       })
           .catch(err => {
               console.log(err); 
           })
}

const  submitnewPass = async event =>
{
    var pass1 = document.getElementById("newPass").value;
    var pass2 = document.getElementById("confirmNewPass").value;

    if(pass1 != pass2)
        alert("Password Not Matching");

    else {
        axios.post('http://localhost:5000/auth/changePassword', {pass1}, { headers: {Authorization: localStorage.getItem('jwtToken')}})
        .then(function(resp) {
            console.log(resp);
            if(resp.status == 200) {
                BacktoProfilePass();
            } 
        })
            .catch(err => {
                console.log(err); 
            })
    }
}

function submitNewClasses()
{
    var courseArray = [];

    for (var i = 0; i<=count; i++) {
        courseArray[i] = document.getElementById("class"+i).getElementsByTagName("input")[0].value;
    }
    courseArray = courseArray.map(toUpper); 

    let req = {
        courses: courseArray,
        count: count 
    }

    axios.post('http://localhost:5000/auth/addCourses', req, { headers: {Authorization: localStorage.getItem('jwtToken')}})
       .then(function(resp) {
           console.log(resp);
           if(resp.status == 200) {
               BacktoProfileClass();
           } 
       })
           .catch(err => {
               console.log(err); 
           })
}


//function Profile()
class Profile extends Component 
{
    state = {
        firstName: '',
        lastName: '',
        schoolName: '',
        email: '',
        courses: [],
        bioBox: ''
    }

    async  componentDidMount() {
        const res = await axios.get('http://localhost:5000/auth/userinfo', { headers: {Authorization: localStorage.getItem('jwtToken')}});
        const resFirst = await res.data.firstName;
        const resLast = await res.data.lastName;
        const resSchool = await res.data.schoolName;
        const resEmail = await res.data.email;
        const resCourses = await res.data.courses; 
        let resBioBox = await res.data.bioBox; 

        this.setState(idk => ({
              firstName: idk.firstName = resFirst,
              lastName: idk.lastName = resLast,
              schoolName: idk.schoolName = resSchool,
              email: idk.email = resEmail,
              courses: idk.courses = resCourses,
              bioBox: idk.bioBox = resBioBox
        })) 
    }

    render() {
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
            
            <lable id = 'FirstyNamey'>First Name: {this.state.firstName}</lable>
            <br />
            <lable id = 'lastName'>Last Name: {this.state.lastName}</lable>
            <br />
            <lable id = 'schoolName'>School: {this.state.schoolName}</lable>
            <br/>
            <lable id = 'tempEmail'>Email: {this.state.email}</lable>
        </div>
        <br/>

        <div id = "bottominfo2">
            
            <lable id = 'FirstyNamey'>Courses</lable>

            <br />


                {this.state.courses.map(thisclass => (<div id = "classesListEdit"><p>{thisclass}</p></div>))}


        </div>

        <br/>
            <div id = "bottominfo3">


                <span id ="CoursesLable">Bio:</span>
                <br/>
                <br/>
                <text>{this.state.bioBox}</text>
                <br/>
                <br/>

            </div>

            <input id = "buttonstyling" type = "button" value = "Update password" onClick={BringUpPass}/>
            <input id = "buttonstyling" type = "button" value = "Update Bio" onClick={BringUpBio}/>


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

            <div id = "classesListEdit"><div id = "class0"><text id ="testhis">Class 1:</text><input type= "text" id="styleText" placeholder = "ex. COP 4331"></input></div></div>

                <div id ="endOfthis"></div>
                </div>
                
                <input type = "button" id = "buttonstyling2" value = "Add Slot" onClick = {addclasses} />
                
                <br/>
                <input type = "button" id = "buttonstyling2" value = "Submit Changes" onClick ={submitNewClasses}/>
                <input type = "button" id = "buttonstyling2" value = "Cancel" onClick = {BacktoProfileClass} />


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
                <input type = "button" id = "buttonstyling2" value = "Cancel" onClick = {BacktoProfilePass} />
            </form>

            <form id = "editBioform">
                Update Bio
                <br/>
                <br/>
                <input id="boxbio" placeholder = "Bio, tell us a bit about your self" ></input>               
                <br/>
                <input type = "button" id = "buttonstyling2" value = "Submit" onClick = {submitnewBio} />
                <input type = "button" id = "buttonstyling2" value = "Cancel" onClick = {BacktoProfileBio} />
            </form>

        </div>

        );
    }
};
export default Profile;