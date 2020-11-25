import React, { useState } from 'react';
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

function getinfo() {
    axios.get('http://localhost:5000/auth/userinfo').then(() => {
        console.log("data received!")
    }).catch(() => {
        alert("Error retrieving data!");  
    })
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

function Profile()
{
    
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

                
        <input id = "buttonstying" type = "button" value = "Update Email"/>
        <input id = "buttonstying" type = "button" value = "Update password"/>
        <input id = "buttonstying" type = "button" value = "Edit Classes"/>
        <input id = "buttonstying" type = "button" value = "back" onClick = {GoHome}/>
            </div>
                
                
            </form>
        </div>
    );
};
export default Profile;