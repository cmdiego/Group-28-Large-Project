import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './ScheduleBuilder.css';

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

    function submitBlock()
    {
        alert('submitButton pressed ' + value.value);
    }
    return(
        <div id="ScheduleDiv">
            <form id="mainScheduleForm">
                <span id="timeSlotBlock">Time Block:
                <br />
                </span>
                <input type="text" id="dateInfo" placeholder="Schedule a day" />
                <Dropdown options={options} onChange={_onSelect} placeholder="Select an option" />
                <br />
            </form>
            <form id="buttonForm">
                <input type="button" id="submitBlock" value="Submit" onClick={submitBlock} />
            </form>
        </div>
    );
};

export default ScheduleBuilder;