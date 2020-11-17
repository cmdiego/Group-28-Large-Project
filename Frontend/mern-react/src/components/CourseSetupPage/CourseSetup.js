import React, { useState } from 'react';
import './CourseSetup.css';
const axios = require('axios');

var count = 1;
var courseCode = [];
var courseNum = [];
function CourseSetup()
{

    function addclass()
    {
       
        var temp = count;

        count ++;


        var newdiv = document.createElement('div');
        newdiv.innerHTML = ('<div id= "form'+(count)+'"><span id= "inner-title">Course '+(count)+ 
                            ':<input type="text" id="setuptextbox" placeholder="Subject Code" />'+
                            '<input type="text" id="setuptextbox" placeholder="Course Number" />'+
                            ' <br/></span>'+
                            '</div>');

        document.getElementById("form"+temp).appendChild(newdiv);

        return;
    };

    function removeclass()
    {
        if (count == 1)
        {
            return;
        }

        var div = document.getElementById("form"+(count));
        div.parentNode.removeChild(div);
        count--;
        
        return;
    };

    function submitclass()
    {
        var temp = 0;
        for(var i = 0; i <count*2; i++)
        {
            courseCode[temp] = document.getElementById("setupForm").elements[i].value;
            courseNum[temp] = document.getElementById("setupForm").elements[i+1].value;
            i++;
            temp++;
        }

        alert(courseCode+courseNum);
        let req = {
            count: count,
            courseCode: courseCode,
            courseNum: courseNum
        }

        axios.post('http://localhost:5000/auth/course',req);

        // Course Code will hold all the course Codes EX. COP/EEL
        // Course Num is the number of all those classes
    };



    return (
        <div id="SetupDiv">
            <form  id = "setupForm">
                <div id = "form1">
                    <span id="inner-title">Course 1:
                        <input type="text" id="setuptextbox" placeholder="Subject Code" />
                        <input type="text" id="setuptextbox" placeholder="Course Number" />
                        
                    </span>
                    <br />
                </div>
                
                <span id="actionbuttons">
                <input type = "button" id = "submitclasses" value = "Add class"  onClick = {addclass}/>
                <input type = "button" id = "submitclasses" value = "Remove class"  onClick = {removeclass}/>
                <input type = "button" id = "submitclasses" value = "Submit"  onClick = {submitclass}/>
                </span>
            </form>
                <span id="classSetupResult"></span>
        </div>
    );
};

export default CourseSetup;