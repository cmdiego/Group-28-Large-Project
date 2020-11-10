import React, { useState } from 'react';
import './CourseSetup.css';

var count = 1;

function CourseSetup()
{

    function addclass()
    {
        
        count ++;
        alert("i exists");

        document.getElementById('form'+(count-1)).innerHTML += ('<div id= form'+count+'><span id= "inner-title">Course '+count+ 
        ':<input type="text" id="setuptextbox" placeholder="Subject Code" />'+
        '<input type="text" id="setuptextbox" placeholder="Course Number" />'+
        '<input type = "button" id = "addclass" value = "+"  onClick = {addclass}/>'+
        '<input type = "button" id = "addclass" value = "-"  />'+
        ' <br/></span>'+
        '</div>');
        return;
    };

    function removeclass()
    {
        alert("need to make delete");
    };

    function submitclass()
    {
        alert("need to make a submit form");
    };



    return (
        <div id="SetupDiv">
            <form  id = "setupForm">
                <div id = 'form1'>
                    <span id="inner-title">Course 1:
                        <input type="text" id="setuptextbox" placeholder="Subject Code" />
                        <input type="text" id="setuptextbox" placeholder="Course Number" />
                        <input type = "button" id = "addclass" value = "+"  onClick = {addclass}/>
                        <input type = "button" id = "addclass" value = "-"  onClick = {removeclass}/>
                    </span>
                    <br />
                </div>
                
                <input type = "button" id = "submitclasses" value = "Submit"  onClick = {submitclass}/>
            </form>
    <span id="classSetupResult"></span>
        </div>
    );
};

export default CourseSetup;