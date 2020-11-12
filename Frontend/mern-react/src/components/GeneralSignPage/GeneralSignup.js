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
        window.location.href = '/CourseSetupPage';
    };
    return (
        <div id="GeneralSignupdiv">
            <form onSubmit={generalCont} id="genFormID">
                <span id="firstNameTitle"></span>
                <br />
                <input type="text" id="firstName" placeholder = "First Name" ref={ (c) => firstName = c} />
                <br />
                <span id="lastNameTitle"></span>
                <br />
                <input type="text" id="lastName" placeholder = "Last Name" ref={ (c) => lastName = c} />
                <br />
                <span id="SchoolNametitle"></span>
                <br />
                <input type="text" id="schoolName" placeholder = "Schools Name" ref={ (c) => schoolName = c} />
                <br />
                <span id="BioTitle"></span>
                <br />
                <textarea id="bioText" placeholder = "Bio, tell us a bit about your self" ref= { (c) => bioInfo = c}></textarea>
                <br />
                <p id = "uploadprofilelable">Upload a profile picture:<input type="file" id ="genSubmit" accept="image/*"/></p>        
        
                <br />
                <input type="submit" id="genSubmit" class="buttons" value="Next" onClick={generalCont} />
            </form>
            <span id="generalSignResult">{message}</span>
        </div>
    );



};

export default GeneralSignup;