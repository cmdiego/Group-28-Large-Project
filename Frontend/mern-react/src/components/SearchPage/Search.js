import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import SearchCard from './SearchCard';
import './Search.css';
const axios = require('axios');
var options = [
    {class: 'COP 4600'},
    {class: 'COP 4331'}
]

function SearchOutput(props)
{
    if(props.value === undefined)
    {
        return <text></text>;
    }
    else 
    {
        /* will most likely have an api call to acquire the information of all tutors with that course and their schedule info with it
            formatted in some kind of way like 
            req = the class they chose to search for
            api point to get res 
            res = [
                {
                    all the info for one schedule block thing segmented in some kind of way
                    example
                    Tutor: {
                        firstName: stuff
                        lastName: stuff
                    },
                    Date: date Object for their schedule,
                    any other info needed
                }, 
                {etc}
            ]
            Would then probably make another component that'll take the res kind and format it kind of like appointCard
            probably then have an add button in that that'll do another api point to add that info into appointments for both student and tutor
            or however that info gets managed within the backend

        */
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

function Search () {
    // converts object array of class into strings in order to use with dropdown menu
    // couldn't quite figure out how to make object arrays work with dropdown so next best thing
    var format  = options.map(function(item)
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
            <button id="backButton" onClick={backButtonProcess} >Back</button>
            <Dropdown id="searchDrop" options={format} onChange={_onSelect} placeholder="Choose a class" />
            <br />
            <SearchOutput value={value.value} />
        </div>
    );
}

export default Search;