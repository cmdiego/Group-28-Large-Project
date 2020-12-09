import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import './Modify.css';
import 'react-datepicker/dist/react-datepicker.css';
const axios = require('axios');

var count = 0;
var editArray = [];
var alreadyPressed = false;

function ModifySchedule() {
    const [startDate,setStartDate] = useState(new Date());
    
    function submitBlock()
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
        if (count === 0)
        {
            if (!alreadyPressed)
            {
                var warndiv = document.createElement('div');
                warndiv.innerHTML = ('<div id= "confirmAppend"><span="inner">Please add atleast 1 Time Slot<br /></span></div>');
                document.getElementById("warnForm").appendChild(warndiv);
                alreadyPressed = true;
            }
            //alert('Please add atleast 1 time Slot');
            return;
        }
        console.log("DateArray")
        axios.post(buildPath('auth/modifyAvailability'), {editArray}, { headers: {Authorization: localStorage.getItem('jwtToken')}})
            .then(function(resp) {
                console.log(resp);
                if(resp.status == 200) {
                    window.location.href = '/TutorProfilePage';
                } 
            })
                .catch(err => {
                    console.log(err); 
                })

        
    }

    function addText()
    {
        editArray.push(startDate);
        var newdiv = document.createElement('div');
        newdiv.innerHTML = ('<br/><div id = "form'+(count)+'"><span id="innerPart">Time Slot '+(count + 1)+' :<text id="timeText">'+editArray[count].toLocaleDateString()+'</text>'+'<text id="dateText"> at '+editArray[(count)].toLocaleTimeString()+'</text>'+' <br /></span>' + '</div>');
        if (count === 0)
        {
            document.getElementById("form").appendChild(newdiv);
        }
        else
        {
            document.getElementById("form"+(count - 1)).appendChild(newdiv);
        }
        count++;
        return;
    }

    function deleteText()
    {
        if (count === 0)
        {
            return;
        }
        var div = document.getElementById("form"+(count - 1));
        div.parentNode.removeChild(div);
        editArray.splice((count - 1), 1);
        count--;
        return;
    }

    return(
        <div id="ScheduleDiv">

            <form id="mainScheduleForm">
                <div id="form">
                    <text></text>
                </div>
                <br/>

                <div id="scheduleInfoDiv">
                    <span id="timeSlotBlock">Choose a Date and Time:
                        <DatePicker id="datePicker" selected={startDate} onChange={date => setStartDate(date)} showTimeSelect />

                    </span>
                    <br />
                </div>
                <div id="addDelButtons">
                    <input type="button" id="addButton" value="+" onClick={addText}/>
                    <input type="button" id="delButton" value="-" onClick={deleteText} />
                </div>
                <div id="buttonForm">
                    <input type="button" id="submitBlock" value="Submit" onClick={submitBlock} />
                </div>
                <div id="warnDiv">
                    <form id="warnForm">
                        <text></text>
                    </form>
                </div>
            </form>

        </div>
    );
}

export default ModifySchedule;