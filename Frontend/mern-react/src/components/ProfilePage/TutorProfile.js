import React, { useState } from 'react';
import './Profile.css';
import download from './download.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const axios = require('axios');


var dummyFname = 'Tutor';
var dummyLname = 'Snow';
var dummySchool = 'Nights Watch';
var dummyEmail = 'jonsnow@gmail.com';
var bioFromAPI = 'String from DB';
var rating =2.5;
var count;

// used for edit availability
var editCount = 0;
var editArray = [];

function TutorProfile()
{

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    // Datepicker hook
    const [startDate,setStartDate] = useState(new Date());


    function BringUpPass()
    {
        var temp = document.getElementById("setupForm").style.display ="none";
        var temp = document.getElementById("editPassform").style.display ="inline-block";
    }

    function BringUpBio()
    {
        var temp = document.getElementById("setupForm").style.display ="none";
        var temp = document.getElementById("editBioform").style.display ="inline-block";
    }
    function BringupSche()
    {
        var temp = document.getElementById("setupForm").style.display ="none";
        var temp = document.getElementById("editAvaform").style.display ="inline-block";
    }

    function BringUpEdit()
{
    var temp = document.getElementById("setupForm").style.display ="none";
    var temp = document.getElementById("editClassForm").style.display ="inline-block";
    count = 0;

}
 
    
    function BacktoProfile2()
    {
        var temp = document.getElementById("editPassform").style.display ="none";
        var temp = document.getElementById("setupForm").style.display = "inline-block";
    }

    function BacktoProfile3()
    {
        var temp = document.getElementById("editBioform").style.display ="none";
        var temp = document.getElementById("setupForm").style.display = "inline-block";
    }

    function BacktoProfile4()
    {
        var temp = document.getElementById("editAvaform").style.display ="none";
        var temp = document.getElementById("setupForm").style.display = "inline-block";
        window.location.reload(false);
    }

    function addclasses()
    {
        var newdiv = document.createElement('span');
        count++;
        newdiv.innerHTML = ('<span id= "inner-title"><div id = "class'+(count)+'"><text id ="testhis">Class '+(count+1)+':</text><input type= "text" id="styleText" placeholder = "ex. COP 4331" ></input></div></span>');

        document.getElementById("endOfthis").appendChild(newdiv);
        return;
    }
    function toUpper(x)
    {
        return x.toUpperCase();
    }; 
    function BacktoProfileClass()
    {
        var temp = document.getElementById("editClassForm").style.display ="none";
        var temp = document.getElementById("setupForm").style.display = "inline-block";
        window.location.reload();
    }

    function submitNewClasses()
    {
        var courseArray = [];
    
        for (var i = 0; i<=count; i++) {
            courseArray[i] = document.getElementById("class"+i).getElementsByTagName("input")[0].value;
        }
        courseArray = courseArray.map(toUpper); 
    
        let req = {
            courses: courseArray,
            count: count 
        }
    
        axios.post('http://localhost:5000/auth/addCourses', req, { headers: {Authorization: localStorage.getItem('jwtToken')}})
           .then(function(resp) {
               console.log(resp);
               if(resp.status == 200) {
                   BacktoProfileClass();
               } 
           })
               .catch(err => {
                   console.log(err); 
               })
    }

    const saveBioChange= async event =>
    {
        //event.preventDefault();
        alert("Send new bio to database");
    }

    const submitnewPass = async event =>
    {
        var pass1 = document.getElementById("newPass").value;
        var pass2 = document.getElementById("confirmNewPass").value;

        if(pass1 != pass2)
            alert("password not matching");

        else
            alert("they match");
    }
    const GoHome = async event =>
    {
        event.preventDefault();
        window.location.href = "/HomePage"; 
        //alert("Shmoovin to profile page");
    };

    const submitnewEmail = async event =>
    {
        var email1 = document.getElementById("newEmail").value;
        var email2 = document.getElementById("confirmNewEmail").value;

        if(email1 != email2)
            alert("password not matching");

        else
            alert("they match");

    }

    function addSlot() {
        editArray.push(startDate);
        var editdiv = document.createElement('div');
        editdiv.innerHTML = ('<br/><div id = "newForm'+(editCount)+'"><span id="innerPart">Time Slot '+(editCount + 1)+' :<text id="timeText">'+editArray[editCount].toLocaleDateString()+'</text>'+'<text id="dateText"> at '+editArray[(editCount)].toLocaleTimeString()+'</text>'+' <br /></span>' + '</div>');
        if (editCount === 0)
        {
            document.getElementById("newForm").appendChild(editdiv);
        }
        else
        {
            document.getElementById("newForm"+(editCount - 1)).appendChild(editdiv);
        }
        editCount++;
        return;
    }

    function removeSlot() {
        if (editCount === 0) 
        {
            return;
        }
        var checkdiv = document.getElementById("newForm"+(editCount - 1));
        checkdiv.parentNode.removeChild(checkdiv);
        editArray.splice((editCount - 1), 1);
        editCount--;
        return;
    }

    function submitAva() {
        if (editCount === 0)
        {
            // Make a label display or something that tells them to add atleast 1 slot
            return;
        }

        // Would do the delete api to clear user's current slots

        // Would then take the current editCount and editArray and ready them into a request for the add api and then do the api

        // would then refresh page or do something to clear the editArray and editCount 
        // so they dont have data carying over when user wants to edit again
    }

    /*componentDidMount = () => {
    };*/
    return(
        <div id="Profileinformation">
           
            <form  id = "setupForm">
                <div id = "form1">
                    <span id="topofForm">Account Information</span>
                    <br/>
                    <br/>
                 <img class = "circular--square" src = {download} alt ="Download"/>    
                    <br/>
            
            
        <div id = "bottominfo">
            
            <lable id = 'FirstyNamey'>First Name: {dummyFname}</lable>
            <br />
            <lable id = 'lastName'>Last Name: {dummyLname}</lable>
            <br />
            <lable id = 'schoolName'>School: {dummySchool}</lable>
            <br/>
            <lable id = 'tempEmail'>Email: {dummyEmail}</lable>
            <br/>
            <br/>
            {/*<label id="tutorRatingLable">Tutor Rating:</label>
            <br/>
            <StarRatingComponent 
            name="tutorrating" 
            starCount={5}
            value={rating}
    />*/}
        
            
        </div>
        <br/>

        <div id = "bottominfo2">
            
            <lable id = 'FirstyNamey'>Schedule </lable>

            <br />

                <ul class = "my-list" id ="ScheduleList" title = "Schedule"> 
                <li>12/9/2020 @ 3:00pm with Arya Stark</li>
                </ul>
           

            <br />

        </div>
        <br />
        <div id = "bottominfo22">
        
            <lable id = 'FirstyNamey'>Courses</lable>

            <br />


        {/*this.state.courses.map(thisclass => (<div id = "classesListEdit">
            <p>{thisclass}</p></div>))*/}
            <div id = "classesListEdit">
            <p>dummyData</p></div>

        </div>

        <br/>
            <div id = "bottominfo3">


                <span id ="CoursesLable">Bio:</span>
                <br/>
                <br/>
                <text>{bioFromAPI}</text>
                <br/>

            </div>



            <input id = "buttonstyling4" type = "button" value = "Update password" onClick={BringUpPass}/>
            <input id = "buttonstyling4" type = "button" value = "Update Bio" onClick={BringUpBio}/>
            <input id = "buttonstyling4" type = "button" value = "Update Classes" onClick={BringUpEdit}/>

            <input id = "buttonstyling4" type = "button" value = "Update Schedule"  onClick = {BringupSche}/>
            <input id = "buttonstyling4" type = "button" value = "Back" onClick = {GoHome} />

            </div>
            </form>

            <form id = "editPassform">
                Update Password
                <br/>
                <br/>
                <input type="password" id="newPass" placeholder = "New Password" class ="password"/>
                <br/>
                <input type="password" id="confirmNewPass" placeholder = "Confirm Password"/>
                
                <br/>
                <input type = "button" id = "buttonstyling2" value = "Submit" onClick = {submitnewPass} />
                <input type = "button" id = "buttonstyling2" value = "Cancel" onClick = {BacktoProfile2} />


            </form>

            <form id = "editBioform">
                Update Bio
                <br/>
                <br/>
                <textarea id="bioText" placeholder = "Bio, tell us a bit about your self" ></textarea>               
                <br/>
                <input type = "button" id = "buttonstyling2" value = "Submit" onClick = {BringUpBio} />
                <input type = "button" id = "buttonstyling2" value = "Cancel" onClick = {BacktoProfile3} />
            </form>

            <form id = "editAvaform">
                <div>
                    <form id="newForm">
                        <text></text>
                    </form>
                </div>
                <br />
                Select Date and Time for new Timeslots: 
                <DatePicker id="datePicker" selected={startDate} onChange={date => setStartDate(date)} showTimeSelect />
                <input type = "button" id = "buttonstyling2" value = "+" onClick = {addSlot}/>
                <input type = "button" id = "buttonstyling2" value = "-" onClick = {removeSlot}/>
                <input type = "button" id = "buttonstyling2" value = "Submit" onClick = {submitnewPass} />
                <input type = "button" id = "buttonstyling2" value = "Cancel" onClick = {BacktoProfile4} />
            </form>

            <form id = "editClassForm">
                Edit Courses
                <br />
                <br />
                <br />
                <div id = "courseEditList">

            <div id = "classesListEdit"><div id = "class0"><text id ="testhis">Class 1:</text><input type= "text" id="styleText" placeholder = "ex. COP 4331"></input></div></div>

                <div id ="endOfthis"></div>
                </div>
                
                <input type = "button" id = "buttonstyling2" value = "Add Slot" onClick = {addclasses} />
                
                <br/>
                <input type = "button" id = "buttonstyling2" value = "Submit Changes" onClick ={submitNewClasses}/>
                <input type = "button" id = "buttonstyling2" value = "Cancel" onClick = {BacktoProfileClass} />

            </form>

        </div>

    );
};
export default TutorProfile;