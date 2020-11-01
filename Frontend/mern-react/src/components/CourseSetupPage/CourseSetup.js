import React, { useState } from 'react';
import './CourseSetup.css';

var count = 1;

function CourseSetup()
{
    var signinEmail;
    var signinPassword;
    const [message,setMessage] = useState('');
    const state = {
        button: 1
    };

    function addclass()
    {

        count ++;
        alert("i exists");
        document.getElementById('setupForm').innerHTML += '<div id= form'+count+'><span id= "inner-title">Course '+count+ 
        ':<input type="text" id="setuptextbox" placeholder="Subject Code" />'+
        '<input type="text" id="setuptextbox" placeholder="Course Number" />'+
        '<input type = "button" id = "addclass" value = "+"  onClick = {addclass}/>'+
        '<input type = "button" id = "addclass" value = "-"  onClick = {addclass}/>'+
        '</span> <br/>';
    };

    function removeclass()
    {
        alert("need to make delete");
    };



    return (
        <div id="SetupDiv">
            <form  id = "setupForm">
                <span id="inner-title">Course 1:
                <input type="text" id="setuptextbox" placeholder="Subject Code" />
                <input type="text" id="setuptextbox" placeholder="Course Number" />
                <input type = "button" id = "addclass" value = "+"  onClick = {addclass}/>
                <input type = "button" id = "addclass" value = "-"  onClick = {removeclass}/>
                </span>
                <br />
            </form>
    <span id="classSetupResult"></span>
        </div>
    );
};

export default CourseSetup;