import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import DatePicker from 'react-datepicker';
import 'react-dropdown/style.css';
import './ScheduleBuilder.css';
import 'react-datepicker/dist/react-datepicker.css';

const options = [
    'one', 'two'
];


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
        alert('submitButton pressed ' + value.value + ' ' + startDate.toDateString());
    }

    return(
        <div id="ScheduleDiv">
            <form id="mainScheduleForm">
                <div id="scheduleInfoDiv">
                    <span id="timeSlotBlock">Time Block:
                        <DatePicker id="datePicker" selected={startDate} onChange={date => setStartDate(date)} excludeTimes/>
                        <Dropdown id="dropDown" options={options} onChange={_onSelect} placeholder="Select an option" />
                    </span>
                    <br />
                </div>
            </form>
            <div id="buttonForm">
                <input type="button" id="submitBlock" value="Submit" onClick={submitBlock} />
            </div>
        </div>
    );
};

export default ScheduleBuilder;