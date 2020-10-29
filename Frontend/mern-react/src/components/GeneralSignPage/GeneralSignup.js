import React, { useState } from 'react';
import './GeneralSignup.css';
function GeneralSignup()
{
    var firstName;
    var lastName;
    var schoolName;
    var bioInfo;
    const [message,setMessage] = useState('');
    const generalCont = async event =>
    {
        event.preventDefault();
        alert('info added ' + firstName.value + ' ' + lastName.value + ' ' + schoolName.value + ' ' + bioInfo.value);
        /* for now loops back to signin*/
        window.location.href = '/SigninPage';
    };
    return (
        <div id="GeneralSignupdiv">
            <form onSubmit={generalCont} id="genFormID">
                <span id="firstNameTitle">First Name:</span>
                <br />
                <input type="text" id="firstName" ref={ (c) => firstName = c} />
                <br />
                <span id="lastNameTitle">Last Name:</span>
                <br />
                <input type="text" id="lastName" ref={ (c) => lastName = c} />
                <br />
                <span id="SchoolNametitle">School Name:</span>
                <br />
                <input type="text" id="schoolName" ref={ (c) => schoolName = c} />
                <br />
                <span id="BioTitle">Bio:</span>
                <br />
                <textarea id="bioText" ref= { (c) => bioInfo = c}></textarea>
                <br />
                <input type="submit" id="genSubmit" class="buttons" value="Next" onClick={generalCont} />
            </form>
            <span id="generalSignResult">{message}</span>
        </div>
    );



};

export default GeneralSignup;