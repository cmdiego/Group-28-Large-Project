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

     function toUpper(x) {
        return x.toUpperCase();
    }; 

    function submitclass()
    {
            //Heroku deployment 
        const app_name = 'opentutor'
        function buildPath(route)
        {
            if(process.env.NODE_ENV === 'production')
            {
                return 'https://' + app_name + '.herokuapp.com/' + route;
            }
            else
            {
                return 'https://localhost:5000/' + route;
            }
        }
        let courseCodeIndex = 0;
        let courseNumIndex = 0;

        var req = {
            count: Number,
            courses: [],
        }

        //Save Subject Code
        for(let i = 0; i < count*2; i=i+2) {
            courseCode[courseCodeIndex] = document.getElementById("setupForm").elements[i].value;
            courseCodeIndex++;
        }
        //Save Course #
       for(let i = 1; i < count*2; i=i+2) {
            courseNum[courseNumIndex] = document.getElementById("setupForm").elements[i].value;
            courseNumIndex++;
        }
        
        req.count = count; 

        //alert(courseCode + " " + courseNum); 

    
        /*for(let i = 0; i < count; i++) {
            req.courseCode.push(courseCode[i]);
            req.courseNum.push(courseNum[i]);
        }*/

        let courses = []; 

        for(let i = 0; i < count; i++) {
            courses[i] = courseCode[i]+ " " + courseNum[i];
        }
  
        courses = courses.map(toUpper); 

        for(let i = 0; i < count; i++) {
            req.courses.push(courses[i]); 
        }
        axios.post(buildPath('auth/addCourse'), req, { headers: {Authorization: localStorage.getItem('jwtToken')}})
        .then(function(resp) {
            const status = resp.status; 
            if(status == 201)
                 window.location = '/ScheduleBuildPage';
            if(status == 202) 
                window.location = '/HomePage';
        })
            .catch(err => {
                console.log(err); 
            })

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