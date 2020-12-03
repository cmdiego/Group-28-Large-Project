
import React, { useState, Component } from 'react';
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

var isOpen = false; 
var isOpen2 = false;

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

function handleDeleteClick()
{
    alert("this works");

    return;
}

function BringUpEdit()
{
    var temp = document.getElementById("setupForm").style.display ="none";
    var temp = document.getElementById("editClassForm").style.display ="inline-block";

}

function BringUpPass()
{
    var temp = document.getElementById("setupForm").style.display ="none";
    var temp = document.getElementById("editPassform").style.display ="inline-block";
}

function BacktoProfile()
{
     var temp = document.getElementById("editClassForm").style.display ="none";
     var temp = document.getElementById("setupForm").style.display = "inline-block";
}

function BacktoProfile2()
{
    var temp = document.getElementById("editPassform").style.display ="none";
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

const togglePopup = () =>
{

    if(!isOpen) {
        isOpen = true; 
    }else {
        isOpen = false; 
    }
   // setIsOpen(!isOpen);

}

const  togglePopup2 = () =>
{
    if(!isOpen) {
        isOpen = true; 
    }else {
        isOpen = false; 
    }
  //setIsOpen2(!isOpen);
}

const  saveBioChange= async event =>
{
    //event.preventDefault();
    alert("Send new bio to database");
}

const  submitnewPass = async event =>
{
    var pass1 = document.getElementById("newPass").value;
    var pass2 = document.getElementById("confirmNewPass").value;

    if(pass1 != pass2)
        alert("password not matching");

    else
        alert("they match");
}

const  submitnewEmail = async event =>
{
    var email1 = document.getElementById("newEmail").value;
    var email2 = document.getElementById("confirmNewEmail").value;

    if(email1 != email2)
        alert("password not matching");

    else
        alert("they match");

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
        const resBioBox = await res.data.bioBox; 

        this.setState(idk => ({
            firstName: idk.firstName = resFirst,
            lastName: idk.lastName = resLast,
            schoolName: idk.schoolName = resSchool,
            email: idk.email = resEmail,
            courses: idk.courses = resCourses,
            bioBox: idk.bioBox = resBioBox
        }))
      }

    //const [isOpen, setIsOpen] = useState(false);
    //const [isOpen2, setIsOpen2] = useState(false);
       

   
    
    
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

                <ul class = "my-list" title = "Courses"> 
                <li>{this.state.courses}</li>
                </ul>
           

            <br />

        </div>

        <br/>
            <div id = "bottominfo3">


                <span id ="CoursesLable">Bio:</span>
                <br/>
                <textarea value={this.state.bioBox}></textarea>
                <input type = "button" id="saveNewBio" class="buttons" value="Save Changes" onClick={saveBioChange}/>

            </div>





            <input id = "buttonstyling" type = "button" value = "Update password" onClick={BringUpPass}/>



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
        </div>

        );
    }
};
export default Profile;