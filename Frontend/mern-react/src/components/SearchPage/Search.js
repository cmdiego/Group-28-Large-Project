
import React, { Component, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import SearchCard from './SearchCard';
import './Search.css';
import otLogo from '../../otLogo.png';
const axios = require('axios');

var options = [{ 
    class: ""
}];

var hold;

var randomBandaid = true;
var bandaid2 = true;

var FirstNames = [];

var classesTest = []; 

//Global list of Tutors
const tutorHolder = [];
//Global list of TutorID's
const tutorID = []; 
//Global list of TutorInfo
const tutorInfo = []; 
//Global list of Tutor Avail 
const tutorAvail = []; 
var lengthDate; 
async function helper(props) {
    randomBandaid = false;
    //Grabs the current selected course from user
    let studentCourse = props.value; 
    
    //Return tutors w/ their ID's that have the same course w/ student ----------------------------------------------------------------------------------------
    await axios.post('http://localhost:5000/auth/checkUserTutorCourse', {studentCourse}, { headers: {Authorization: localStorage.getItem('jwtToken')}})
    .then(function(data) {
        const { tut } = data.data;
        const TutorLength = tut.length; 
        let tempID = [];
        for(let i = 0; i < TutorLength; i++) {
            tempID[i] = tut[i].user; 
        }
        tutorID.push(tempID);
    })
    .catch(err => {
        console.log("Error in retrieving list of Tutor IDs: " + err);
    })

    //Returns a list of tutor objects info: firstName, lastName, email ------------------------------------------------------------------------------------------------------------------------
    const tutorLength = tutorID.length; 
    let tempTutor = []; 
    for(let i = 0; i < tutorLength; i++) {
        let tempID = tutorID[i];
        await axios.post('http://localhost:5000/auth/getTutorInfo', {tempID}, { headers: {Authorization: localStorage.getItem('jwtToken')}})
        .then(function(other) {
            const tutorinfo  = other.data; 
            tempTutor[i] = tutorinfo;
        }) 
        .catch(err => {
            console.log("Error in returning list of tutorInformation: " + err);
        })
    }

    //Assign the tutorObjects into the tutorInfo Array
    for(let i = 0; i < tempTutor.length; i++) {
        tutorInfo[i] = tempTutor[i];
    }

    //Grab the list of tutorAvailability -------------------------------------------------------------------------------------------------------------------------------------------------------
    let tempAvail = [];
    tempAvail.splice(0); 

    for(let i = 0; i < tutorLength; i++) {
        let tempID = tutorID[i];
        await axios.post('http://localhost:5000/auth/getTutorAvailability', {tempID}, { headers: {Authorization: localStorage.getItem('jwtToken')}})
        .then(function(anotha) {
            const dt  = anotha.data; 
            tempAvail[i] = dt;
            lengthDate = dt.date.length; 
            console.log("DT: " + dt.date.length); 
        }) 
        .catch(err => {
            console.log("Error in returning list of tutorAvail: " + err);
        })
    }

    console.log("TempAvailLength: " + tempAvail.length); 
    //Assign the array of tutor Availabilities to tutorAvail
    for(let i = 0; i < tempAvail.length; i++) {
        tutorAvail[i] = tempAvail[i];
    }

    //Let's start putting it all into an Tutor Object! 
    tutorHolder.splice(0, tutorHolder.length);
    console.log("TutorDate length: " + tutorAvail);
    //Create a Tutor Object
    for(let i = 0; i < tutorLength; i++)
    {
        for(let j = 0; j <= tempAvail.length; j++)
        {
            var obj = { 
                Tutor:{
                    firstName: tutorInfo[i].firstName,
                    lastName: tutorInfo[i].lastName,
                    email: tutorInfo[i].email, 
                    tutorID: tutorID[i],
                }, 
                Date: new Date (tutorAvail[i].date[j]),
                Course: props.value, 
            }
            tutorHolder.push(obj);
        }
       var myDate = new Date(obj.Date);
        console.log("Date: " + myDate); 
        console.log(obj); 
        console.log("TutorID: " + obj.Tutor.tutorID); 
        console.log("Tutor Course: " + obj.Course); 
    }
    bandaid2 = false;

    
}
    

function SearchOutput(props)
{
    //alert("first");
    if(props.value === undefined)
    {
        return <text></text>;
    }
    else 
    { 
        helper(props);
        var coun = 0;
       
        

        return (
            <div id="SearchDisplay">
                <br/>
        <span id ="avaTutorspan">Available Tutor appointments for: {props.value}</span>
                {tutorHolder.map(searchInfo => (
                    <SearchCard info={searchInfo} />
                ))} 
                
            </div>
        );
    }
}

const backButtonProcess = async event =>
{
    event.preventDefault();
    window.location.href = '/HomePage';
}


async function getCourse() {
    const res = await axios.get('http://localhost:5000/auth/getCourse', { headers: {Authorization: localStorage.getItem('jwtToken')}});
    let c =  await res.data.courses;
    
    for(let i = 0; i < c.length; i++) {
        classesTest[i] = c[i];
    }

}
const searchStuff = async event =>
{
    event.preventDefault();
    
    var stuff = hold;
    console.log("hello" + stuff);
    return (
        <text>{stuff}</text>
    );
}

  function Search() {
    const [value,setValue] = useState('');

    const _onSelect=(e)=>{
        //console.log(e);
        setValue(e);
    }
    getCourse();


    
        return (
            <div id="searchPageDiv">
                <img class = "img-thumbnail" src = {otLogo} alt ="otLogo"/>    
                <button id="backButton" onClick={backButtonProcess} >Back</button>
                <div id="DropdownHelper">
                <Dropdown id="searchDrop" options={classesTest} onChange={_onSelect} placeholder="What class do you need help with?" />
                {/*<button onClick={searchStuff}>search</button>*/}

                <SearchOutput value={value.value} />
                </div>
                
            </div>
        );
}

export default Search;



























/*import React, { Component, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import SearchCard from './SearchCard';
import './Search.css';
import otLogo from '../../otLogo.png';
const axios = require('axios');

var options = [
    {class: 'COP 4600'},
    {class: 'COP 4331'}
]

var value = {
    value: undefined
}

  function setValue(e) {
    value.value = e.value; 
}

const _onSelect=(e)=>{
    setValue(e);
}

//When User Clicks on Class, the following Appointment cards will display
function SearchOutput(props)
{ 
    console.log(props.value);
    if(props.value === undefined)
    {
        return <text></text>;
    }
    else 
    {
        // Would fill this array with information from search api and display with search card
        var test2 = [
            {
                Tutor: 
                {
                    firstName: 'Robert',
                    lastName: 'Johnson',
                    email: 'robZone@gmail.com'
                },
                Date: new Date()
            },
            {
                Tutor: 
                {
                    firstName: 'Robert',
                    lastName: 'John',
                    email: 'robZone@gmail.com'
                },
                Date: new Date()
            }
        ];

        return (
            <div id="SearchDisplay">
                <br/>
        <span id ="avaTutorspan">Available Tutor appointments for: {props.value}</span>
                {test2.map(searchInfo => (
                    <SearchCard info={searchInfo} />
                ))}
            </div>
        );
    }
}

const backButtonProcess = async event =>
{
    event.preventDefault();
    window.location.href = '/HomePage';
}

//Convert Class Objects into an array of classes in dropdown 
var format  = options.map(function(item)
{
    return item['class']
});

class Search extends Component {
    // converts object array of class into strings in order to use with dropdown menu
    // couldn't quite figure out how to make object arrays work with dropdown so next best thing
    render() {
        console.log(value.value); 
        return (
            <div id="searchPageDiv">
                <img class = "img-thumbnail" src = {otLogo} alt ="otLogo"/>    
                <button id="backButton" onClick={backButtonProcess} >Back</button>
                <div id="DropdownHelper">
                    <Dropdown id="searchDrop" options={format} onChange={_onSelect} placeholder="What class do you need help with?" />
                    <SearchOutput value={value.value} />
                </div>
                
            </div>
        );
    };
}

export default Search;*/

