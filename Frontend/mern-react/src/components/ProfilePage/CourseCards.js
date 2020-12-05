import React from 'react';


function CourseInfo(props) {
    return (
        <text>{': ' + props.Course}</text>
    );
}

// gonna pass prop in as props.Tutor

class CourseCards extends React.Component {
    constructor(props) {
        super(props);
        this.info = props.info;
        this.isStudent = props.isStudent;
        this.state = {isDisplayed: true};
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }
    handleDeleteClick()
    {
        var choice = window.confirm("Are you sure you want to cancel this Appointment?");
        if (choice)
        {
            this.setState({isDisplayed: false});
        }
    }

    render() {
        const isDisplayed = this.state.isDisplayed;
        var stuff = this.info;
        if (isDisplayed)
        {
            return (
                <div>

                     <CourseInfo Student={stuff.CourseInfo} />
                    <button onClick={this.handleDeleteClick}> Edit </button>
                    <button onClick={this.handleDeleteClick}>Delete</button>
                </div>
            );
        }
        else{
            return null;
        }
    }
    
}


export default CourseCards;