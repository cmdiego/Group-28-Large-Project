import React, { useState } from 'react';
import './Home.css';

function Home () {
    /*will be determined with data from user but for now set to student homepage look*/
    var mockfirstName = 'Brent';
    var mocklastName = 'Smith';
    var mockCode = 'COP';
    var mockNumber = '3402';
    var mockDate = '11/10';
    var mockTime = '9:45';
    var isStudent = true;
    const searchProcess = async event =>
    {
        event.preventDefault();
        alert("Shmoovin to the search page");
    };

    const profileProcess = async event =>
    {
        event.preventDefault();
        alert("Shmoovin to profile page");
    };

    const logoutProcess = async event =>
    {
        event.preventDefault();
        alert("Logging out");
        window.location.href = '/SignupPage';
    };
    const deleteCardProcess = async event =>
    {
        event.preventDefault();
        alert("delete card/ cancel appointment");
    };

    return (
        <div id="HomepageDiv">
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
        </div>
    );
}

export default Home;