import React, { Component, useState } from 'react';
import AppointCard from './AppointCard';
import otLogo from '../../otLogo.png';
import './Home.css';

const axios = require('axios');
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
    },

    {
        Course: 'COP4331',
        Tutor: 
        {
            firstName: 'James',
            lastName: 'Smith',
            email: 'Jsmite@gmail.com'
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
var test = [];
var hold = [];
const searchProcess = async event =>
{
    event.preventDefault();
    window.location.href = '/SearchPage';
    //alert("Shmoovin to the search page");
};

 const profileProcess = async event =>
{
    event.preventDefault();
    
  await  axios.get('http://localhost:5000/auth/profile', { headers: {Authorization: localStorage.getItem('jwtToken')}})
    .then(function(resp) {
        const { isStudent, isTutor } = resp.data;
        if(isStudent == true) {
            window.location.href = '/ProfilePage';
        } 
        if(isTutor == true) {
            window.location.href = '/TutorProfilePage';
        }
    })
        .catch(err => {
            console.log(err); 
        })
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


class Home extends Component {

    state = {
        stu: '',
    }

    async componentDidMount() {
        const res = await  axios.get('http://localhost:5000/auth/profile', { headers: {Authorization: localStorage.getItem('jwtToken')}});
        const resAppt = await axios.get('http://localhost:5000/auth/getAppointment', { headers: {Authorization: localStorage.getItem('jwtToken')}});
        console.log("whole thing: ");
        //console.log(resAppt.data.appt[0]._id);
        var length = resAppt.data.appt.length;
        console.log("number of appt: " + length)
        /* appt structure
            appt : [{
                _id: id of appointment,
                class: class String,
                student: id of student,
                studentName: name of student,
                studentEmail: email of student,
                tutor: id of tutor,
                tutorName: name of tutor,
                tutorEmail: email of tutor,
                time: date that needs to be formatted new Date (info in appt)

            },
        ]
        */
        
        for (let i = 0; i < length; i++)
        {
            
            var things = {
                id : resAppt.data.appt[i]._id,
                course: resAppt.data.appt[i].course,
                Date: new Date(resAppt.data.appt[i].time), 
                tutor: resAppt.data.appt[i].tutor,
                tutorName: resAppt.data.appt[i].tutorName,
                tutorEmail: resAppt.data.appt[i].tutorEmail,
                student: resAppt.data.appt[i].student,
                studentName: resAppt.data.appt[i].studentName,
                studentEmail: resAppt.data.appt[i].studentEmail
            }
            hold.push(things);
            
        }
        console.log("hold");
        console.log(hold[0]);
        
        const stud = await res.data.isStudent;

        this.setState((state) => {
            return {stu: state.stu = stud};
        });
        
    }

   render() {
    return (
        <div id="HomepageDiv">
            <img class = "img-thumbnail" src = {otLogo} alt ="otLogo"/>    
            <input type="button" id="profileButton" class="button" value="Profile" onClick={profileProcess} />
            <input type="button" id="logoutButton" class="button" value="Log Out" onClick={logoutProcess} />
            
            <div id ="middleOfPage">
            {this.state.stu ? <input type="button" id="searchButton" class="button" value="Search for Tutors" onClick={searchProcess} /> : <div></div>}
                {hold.map(infoStuff => (
                    <AppointCard info={infoStuff} isStudent={this.state.stu} />
                ))}
            
            </div>
        </div>
        );
   };
};

export default Home;