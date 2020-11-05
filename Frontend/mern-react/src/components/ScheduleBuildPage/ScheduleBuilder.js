import React, { useState } from 'react';
import './ScheduleBuilder.css';
function ScheduleBuilder()
{
    function addBlock()
    {
        alert('addButton pressed');
    }
    return(
        <div id="ScheduleDiv">
            <form id="mainScheduleForm">
                <span id="timeSlotBlock">Time Block:
                <br />
                </span>
                <input type="text" id="dateInfo" placeholder="Schedule a day" />
                <input type="text" id="timeInfo" placeholder="Schedule a time" /> 
                <input type="text" id="durationInfo" placeholder="For how long?" />
                <br />
            </form>
            <form id="buttonForm">
                <input type="button" id="addBlock" value="+" onClick={addBlock} />
            </form>
        </div>
    );
};

export default ScheduleBuilder;