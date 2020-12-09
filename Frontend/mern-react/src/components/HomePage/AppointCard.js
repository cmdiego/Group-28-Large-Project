import React from 'react';
import './AppointCard.css';
const axios = require('axios');
/*
 var res = [
     {
         Course: ,
         Tutor: {
             firstName: ,
             lastName: 
         },
         Student: {
             firstName: ,
             lastName:
         }
         Date: whole date Object
            but will have to format date and time out of it
            getHours, and something else
     },{}
 ]
*/

function CourseInfo(props) {
    return (
        <text>{'Course: ' + props.course}</text>
    );
}

// gonna pass prop in as props.Tutor
function TutorInfo(props) {
    return (
        <text>{'Tutor: ' + props.tutorName}</text>
    );
}

function EmailInfo(props) {
    return (
        <text>{'Email: ' + props.email}</text>
    );
}

function StudentInfo(props) {
    return (
        <text>{'Student: ' + props.studentName}</text>
    );

}

// takes date object and formats to mm/dd/yyyy format to output or whatever the local date structure is
function formatDate(date) {
    return date.toLocaleDateString();
}

function DateInfo(props) {
    return (
    <text>{'Date: ' + formatDate(props.Date) + ' at ' + props.Date.toLocaleTimeString()}</text>
    );
}

function formatTime(date) {
    var dateStuff = date.getHours();
    var format;
    // go in if its midnight
    if (dateStuff === 0)
    {
        format = (dateStuff + 12) + ' am';
    }
    else if (dateStuff < 12)
    {
        format = dateStuff + ' am';
    }
    else if (dateStuff > 12)
    {
        format = (dateStuff - 12) + ' pm';
    }
    // reach here if it is 12 pm
    else
    {
        format = dateStuff + ' pm';
    }
    return format;
}

function TimeInfo(props) {
    return (
        <text>{'Time: ' + formatTime(props.Date)}</text>
    );
}

class AppointCard extends React.Component {
    constructor(props) {
        super(props);
        this.info = props.info;
        this.isStudent = props.isStudent;
        this.state = {isDisplayed: true};
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }
    async handleDeleteClick() {
        //Heroku deployment 
    const app_name = 'opentutor'
    function buildPath(route)
    {
        if(process.env.NODE_ENV === 'production')
        {
            return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else
        {
            return 'https://localhost:5000/' + route;
        }
    }
        var choice = window.confirm("Are you sure you want to cancel this Appointment?");
        
        if (choice)
        {
            var apptID = this.info.id;
            var tutorID = this.info.tutor;
            var dateObj = this.info.Date;
            const res = await  axios.post(buildPath('auth/cancelAppointment'), {apptID, tutorID, dateObj}, { headers: {Authorization: localStorage.getItem('jwtToken')}})
            console.log("response: " + res);
            this.setState({isDisplayed: false});
        }
    }

    render() {
        const isDisplayed = this.state.isDisplayed;
        var isStudent = this.isStudent;
        var stuff = this.info;
        // Enter here if given empty info (no appointments owned)
        if (Object.entries(stuff).length === 0 || stuff === undefined)
        {
            return (
                <div>
                    <text>No Current Appointments</text>
                </div>
            );
        }
        if (isDisplayed)
        {
            return (
                <div id = "CardStyle">Appointment Info
                    <div id = "innerStylecard">
                    <CourseInfo course={stuff.course} />
                    <br/>
                    <DateInfo Date={stuff.Date} />
                    <br />
                    
                    {isStudent ? <TutorInfo tutorName={stuff.tutorName} /> : <StudentInfo studentName={stuff.studentName} />}<br/>
                    {isStudent ? <EmailInfo email={stuff.tutorEmail} /> : <EmailInfo email={stuff.studentEmail} />}<br/>
                    
                    <br />
                    </div>
                    <button id= "deleteCardButton"onClick={this.handleDeleteClick}>X</button>
                </div>
            );
        }
        // enter when delete button pressed to stop displaying info
        else{
            return null;
        }
    }
    
}


export default AppointCard;