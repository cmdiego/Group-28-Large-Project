import React from 'react';
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
        <text>{'Course: ' + props.Course}</text>
    );
}

// gonna pass prop in as props.Tutor
function TutorInfo(props) {
    return (
        <text>{'Tutor: ' + props.Tutor.firstName + ' ' + props.Tutor.lastName}</text>
    );
}

function StudentInfo(props) {
    return (
        <text>{'Student: ' + props.Student.firstName + ' ' + props.Student.lastName}</text>
    );

}

// takes date object and formats to mm/dd/yyyy format to output or whatever the local date structure is
function formatDate(date) {
    return date.toLocaleDateString();
}

function DateInfo(props) {
    return (
    <text>{'Date: ' + formatDate(props.Date)}</text>
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
    handleDeleteClick() {
        var choice = window.confirm("Are you sure you want to cancel this Appointment?");
        if (choice)
        {
            this.setState({isDisplayed: false});
        }
    }

    render() {
        const isDisplayed = this.state.isDisplayed;
        var isStudent = this.isStudent;
        var stuff = this.info;
        if (isDisplayed)
        {
            return (
                <div>
                    <CourseInfo Course={stuff.Course} />
                    <DateInfo Date={stuff.Date} />
                    <br />
                    {isStudent ? <TutorInfo Tutor={stuff.Tutor} /> : <StudentInfo Student={stuff.Student} />}
                    <TimeInfo Date={stuff.Date} />
                    <br />
                    <button onClick={this.handleDeleteClick}>X</button>
                </div>
            );
        }
        else{
            return null;
        }
    }
    
}


export default AppointCard;