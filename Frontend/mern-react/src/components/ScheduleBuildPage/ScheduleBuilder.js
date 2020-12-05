import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import DatePicker from 'react-datepicker';
import 'react-dropdown/style.css';
import './ScheduleBuilder.css';
import 'react-datepicker/dist/react-datepicker.css';
const axios = require('axios');

var count = 0;
var dateArray = [];

function ScheduleBuilder()
{


    const [startDate,setStartDate] = useState(new Date());
    
    function submitBlock()
    {

        if (count === 0)
        {
            alert('Please add atleast 1 time Slot');
            return;
        }

        let req = {
            count: count,
            dateArray: dateArray
        }
        
        axios.post('http://localhost:5000/timeslot/add', req);
        
    }

    function addText()
    {
        dateArray.push(startDate);
        var newdiv = document.createElement('div');
        newdiv.innerHTML = ('<br/><div id = "form'+(count)+'"><span id="innerPart">Time Slot '+(count + 1)+' :<text id="timeText">'+dateArray[count].toLocaleDateString()+'</text>'+'<text id="dateText"> at '+dateArray[(count)].toLocaleTimeString()+'</text>'+' <br /></span>' + '</div>');
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
        dateArray.splice((count - 1), 1);
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
            </form>

        </div>
    );
};

export default ScheduleBuilder;