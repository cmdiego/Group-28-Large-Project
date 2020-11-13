import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import DatePicker from 'react-datepicker';
import 'react-dropdown/style.css';
import './ScheduleBuilder.css';
import 'react-datepicker/dist/react-datepicker.css';

const options = [
    'one', 'two'
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
        alert('submitButton pressed ' + timeArray[0] + ' ' + dateArray[0] + ' ' +timeArray.length);
    }

    function addText()
    {
        timeArray.push(value.value);
        dateArray.push(startDate.toDateString());
        var newdiv = document.createElement('div');
        newdiv.innerHTML = ('<div id = "form'+(count)+'"><span id="innerPart">Time Slot '+(count + 1)+':<text id="timeText">{'+dateArray[count]+'}</text>'+'<text id="dateText">{'+timeArray[(count)]+'}</text>'+' <br /></span>' + '</div>');
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
            </form>
            <div id="buttonForm">
                <input type="button" id="submitBlock" value="Submit" onClick={submitBlock} />
            </div>
        </div>
    );
};

export default ScheduleBuilder;