
import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import SearchCard from './SearchCard';
import './Search.css';
import otLogo from '../../otLogo.png';
const axios = require('axios');

var options = [{ class: ""}];

function SearchOutput(props)
{
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
        var test3 = [{}];
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

async function getCourse() {
    const res = await axios.get('http://localhost:5000/auth/getCourse', { headers: {Authorization: localStorage.getItem('jwtToken')}});
    let course =  await res.data.courses ;
    options.class = course;
    console.log(options.class[0]);
}

  function Search () {
    // converts object array of class into strings in order to use with dropdown menu
    // couldn't quite figure out how to make object arrays work with dropdown so next best thing
    //const course =  res.data.courses; 
    getCourse();


    var format  =  options.map(function(item)
    {
        return item['class']
    });
    

    const _onSelect=(e)=>{
        console.log(e);
        setValue(e);
    }

    const [value,setValue] = useState('');
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

