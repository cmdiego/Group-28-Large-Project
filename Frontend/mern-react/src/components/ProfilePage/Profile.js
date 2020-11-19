import React, { useState } from 'react';
import './Profile.css';
import download from './download.png';
var dummyFname = 'Jon';
var dummyLname = 'Snow';
var dummySchool = 'Nights Watch';
var dummyEmail = 'jonsnow@gmail.com';

/*need API to send a File like this*/
const classes = [

    {class: 'COP 4600'},
    {class: 'COP 4331'},
    {class: 'CIS 4940'},
    {class: 'COP 3502'}

]


function Profile()
{
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
            
            
            <span id ="CoursesLable">Courses:</span>

            <br />
            {classes.map(thisclass => (<p>{thisclass.class}</p>))}
            <br />

        </div>

                
        <input id = "buttonstying" type = "button" value = "Update Email"/>
        <input id = "buttonstying" type = "button" value = "Update password"/>
        <input id = "buttonstying" type = "button" value = "Edit Classes"/>
        <input id = "buttonstying" type = "button" value = "back"/>
            </div>
                
                
            </form>
        </div>
    );
};


export default Profile;