import React from 'react';
import './Search.css';
const axios = require('axios');



function TutorInfo(props) {
    return( 
        <text>{'Tutor: ' + props.Tutor.firstName + ' ' + props.Tutor.lastName + ' '}</text>
    );
}

function EmailInfo(props) {
    return(
        <text>{'Email: ' + props.Tutor.email}</text>
    );
}



function formatDate(date)
{
    return (
        date.toLocaleDateString()
    );
}

function DateInfo(props) {
    return (
        <text>{'Date: ' + props.Date.toLocaleDateString() + ' ' + props.Date.toLocaleTimeString()}</text>

    );
   /* return (
        <text>{'Date: ' + formatDate(props.Date) + ' '}</text>
    );*/
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


class SearchCard extends React.Component {
    constructor(props)
    {
        super(props);
        this.info = props.info;
        this.handleAddClick = this.handleAddClick.bind(this);
    }
    async handleAddClick(){
        const tutor = this.info; 
        const tutorID = tutor.Tutor.tutorID; 
        const courseName = tutor.Course; 
        const dateObj = tutor.Date; 
        const tutorName = tutor.Tutor.firstName + " " + tutor.Tutor.lastName; 
        const tutorEmail = tutor.Tutor.email; 

        //Creates Appointment once schedule button is clicked
        await axios.post('http://localhost:5000/auth/createAppointment', {tutorID, courseName, dateObj, tutorName, tutorEmail}, { headers: {Authorization: localStorage.getItem('jwtToken')}})
        .then(function(anotha) {
            console.log("Appointment Added! " + anotha); 
            if(anotha.status == 200) {
                window.location.href = '/HomePage';
            }
        }) 
        .catch(err => {
            console.log("Error: " + err); 
        })
    }

    render() {
        var slotInfo = this.info;
        console.log("Slotinfo: " + slotInfo);
        if (Object.entries(slotInfo).length === 0)
        {
            return (
                <div>
                    <text>No Tutors Found</text>
                </div>
            );
        }
        else 
        {
            
            return (
                <div className="SearchCard" id = "CardStyle">Appointment Details
                    <div className="searchContent">
                    <div id = "innerStylecard">
                        <TutorInfo Tutor={slotInfo.Tutor} />
                        <br/>
                        <EmailInfo Tutor={slotInfo.Tutor} />
                        <br />
                        <DateInfo Date={slotInfo.Date} />

                       {/* <DateInfo Date={slotInfo.Date} /> */}
                        <br/>
                       {/* <TimeInfo Date={slotInfo.Date} />*/}
                    </div>
                    </div>
                    <div>
                        <button id = "buttonStyle5" onClick={this.handleAddClick}>Schedule Now</button>
                    </div>
                </div>
            );
            
        }
    }

}

export default SearchCard;
