import React, { useState } from 'react';
import AppointCard from './AppointCard';
import otLogo from '../../otLogo.png';
import './Home.css';

const axios = require('axios');
/*
function Thingerino(props) {
    var mockfirstName = 'Brent';
    var mocklastName = 'Smith';
    var mockCode = 'COP';
    var mockNumber = '3402';
    var mockDate = '11/10';
    var mockTime = '9:45';
    var isStudent = true;
    var show = true;
    const delet = async event =>
    {
        event.preventDefault();
        show = false;
    }
    if (show)
    {
       return (
        <div id="wrapAround">
            <div id="mockCard">
                <span id="coursePart">
                    <text>Course: </text>
                    <text>{mockCode + ' ' + mockNumber}</text>
                </span>
                <span id="datePart">
                    <text>Date: </text>
                    <text>{mockDate}</text>
                </span>
                <span id="tutorPart">
                    <text>Tutor: </text>
                    <text>{mockfirstName + ' ' + mocklastName}</text>
                </span>
                <span id="timePart">
                    <text>Time: </text>
                    <text>{mockTime}</text>
                </span>
            </div>
            <button id="deleteCardButton" onClick={delet}>X</button>
        </div>
       );
    }
    else
    {
        return null;
    }
}
*/
function Home () {
    /*will be determined with data from user but for now set to student homepage look*/
    var mockfirstName = 'Brent';
    var mocklastName = 'Smith';
    var mockCode = 'COP';
    var mockNumber = '3402';
    var mockDate = '11/10';
    var mockTime = '9:45';
    var isStudent = true;
    var testInfo = [
        {
            Course: 'COP4600',
            Tutor: 
            {
                firstName: 'Jeremy',
                lastName: 'Elbertson',
                email: 'jerma986@gmail.com'
            },
            Student: 
            {
                firstName: 'John',
                lastName: 'Johnson',
                email: 'johnjohn@gmail.com'
            },
            Date: new Date()
        }
    ];
    const searchProcess = async event =>
    {
        event.preventDefault();
        window.location.href = '/SearchPage';
        //alert("Shmoovin to the search page");
    };

    const profileProcess = async event =>
    {
        event.preventDefault();
        window.location.href = "/ProfilePage"; 
        //alert("Shmoovin to profile page");
    };

    const logoutProcess = async event =>
    {
        event.preventDefault();
        //alert("Logging out");
        window.location.href = '/SigninPage';
    };
    const deleteCardProcess = async event =>
    {
        event.preventDefault();
        alert("delete card/ cancel appointment");
    };
    // used to test if search results are empty
    var testInfo2 = [{}];
    return (
        <div id="HomepageDiv">
            <img class = "img-thumbnail" src = {otLogo} alt ="otLogo"/>    
            <input type="button" id="profileButton" class="button" value="Profile" onClick={profileProcess} />
            {isStudent ? <input type="button" id="searchButton" class="button" value="Search for Tutors" onClick={searchProcess} /> : <div></div>}
            <input type="button" id="logoutButton" class="button" value="Log Out" onClick={logoutProcess} />
            <div id="wrapAround">
                <div id="mockCard">
                    <span id="coursePart">
                        <text>Course: </text>
                        <text>{mockCode + ' ' + mockNumber}</text>
                    </span>
                    <span id="datePart">
                        <text>Date: </text>
                        <text>{mockDate}</text>
                    </span>
                    <span id="tutorPart">
                        <text>Tutor: </text>
                        <text>{mockfirstName + ' ' + mocklastName}</text>
                    </span>
                    <span id="timePart">
                        <text>Time: </text>
                        <text>{mockTime}</text>
                    </span>
                </div>
                <button id="deleteCardButton" onClick={deleteCardProcess}>X</button>
            </div>
            <div>
                {testInfo.map(infoStuff => (
                    <AppointCard info={infoStuff} isStudent={true} />
                ))}
            
            </div>
            {/*
            <div id="wrapAround">
                <div id="mockCard">
                    <span id="coursePart">
                        <text>Course: </text>
                        <text>{mockCode + ' ' + mockNumber}</text>
                    </span>
                    <span id="datePart">
                        <text>Date: </text>
                        <text>{mockDate}</text>
                    </span>
                    <span id="tutorPart">
                        <text>Tutor: </text>
                        <text>{mockfirstName + ' ' + mocklastName}</text>
                    </span>
                    <span id="timePart">
                        <text>Time: </text>
                        <text>{mockTime}</text>
                    </span>
                </div>
                <button id="deleteCardButton" onClick={deleteCardProcess}>X</button>
            </div>
            */}
        </div>
    );
}

export default Home;