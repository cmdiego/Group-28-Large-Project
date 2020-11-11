import React, { useState } from 'react';
import './CourseSetup.css';

var count = 1;

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
        alert("need to make a submit form");
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