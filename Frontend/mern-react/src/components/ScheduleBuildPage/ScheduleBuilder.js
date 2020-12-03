import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import DatePicker from 'react-datepicker';
import 'react-dropdown/style.css';
import './ScheduleBuilder.css';
import 'react-datepicker/dist/react-datepicker.css';
const axios = require('axios');

const options = [
    '8:00am - 9:00am',
    '9:00am - 10:00am',
    '10:00am - 11:00am',
    '11:00am - 12:00pm',
    '12:00pm - 1:00pm',
    '1:00pm - 2:00pm',
    '2:00pm - 3:00pm',
    '3:00pm - 4:00pm',
    '4:00pm - 5:00pm',
    '5:00pm - 6:00pm',
    '6:00pm - 7:00pm',
    '7:00pm - 8:00pm' 
];
var count = 0;
var timeArray = [];
var dateArray = [];

function ScheduleBuilder()
{
    const _onSelect=(e)=>{
        console.log(e);
        setValue(e);
    }

    const [value,setValue] = useState('');

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
            timeArray: timeArray,
            dateArray: dateArray
        }
        
        axios.post('http://localhost:5000/timeslot/add', req);
        
    }

    function addText()
    {
        timeArray.push(value.value);
        dateArray.push(startDate);
        var newdiv = document.createElement('div');
        newdiv.innerHTML = ('<br/><div id = "form'+(count)+'"><span id="innerPart">Time Slot '+(count + 1)+' :<text id="timeText">'+dateArray[count].toDateString()+'</text>'+'<text id="dateText"> at '+timeArray[(count)]+'</text>'+' <br /></span>' + '</div>');
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
        timeArray.splice((count - 1), 1);
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
                    <span id="timeSlotBlock">Choose Day:
                        <DatePicker id="datePicker" selected={startDate} onChange={date => setStartDate(date)} />
                        <text id="chooseTime">Choose Time: </text>
                        
                        <Dropdown id="dropDown" options={options} onChange={_onSelect} placeholder="Select an option" />

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