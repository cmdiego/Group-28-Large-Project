import React from 'react';
import './Search.css';



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
        <text>{'Date: ' + formatDate(props.Date) + ' '}</text>
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


class SearchCard extends React.Component {
    constructor(props)
    {
        super(props);
        this.info = props.info;
        this.handleAddClick = this.handleAddClick.bind(this);
    }
    handleAddClick(){
        //to handle adding to appointments when button clicked
    }

    render() {
        var slotInfo = this.info;
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
                        <br/>
                        <TimeInfo Date={slotInfo.Date} />
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
