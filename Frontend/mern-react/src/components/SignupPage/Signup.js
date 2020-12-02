import React, { useState } from 'react';
import './SignUp.css';
import otLogo from '../../otLogo.png';
const axios = require('axios'); 
var alreadyPressed = false;

function Signup()
{
    var signupEmail, signupPassword, confirmPassword;
    const [message,setMessage] = useState('');
    const state = {
        button: 1
    };

    const signupProcess = async event => {
        event.preventDefault();

        //User is on the Signup page
        if (state.button === 1){
            if (!(signupPassword.value === confirmPassword.value))
            {
                alert('Passwords don\'t match');
                return;
            }
            if(signupPassword.value < 6) {
                alert('Password has be at least 6 characters long!');
                console.log('Password has be at least 6 characters long!'); 
                return;
            }
                                        //Student
            if(document.getElementById('radiobutton1').checked)
            {
                //Get the email, password, student, and tutor value
                let req = {
                    email: signupEmail.value, 
                    password: signupPassword.value,
                    student: true, 
                    tutor: false
                }
                axios.post('http://localhost:5000/auth/signup', req)
                .catch(err => {
                    console.log(err); 
                })
                console.log("Student signup work!");
                if (!alreadyPressed)
                {
                    var newdiv = document.createElement('div');
                    newdiv.innerHTML = ('<div id= "confirmAppend"><span="inner">Confirmation Email Sent<br /></span></div>');
                    document.getElementById("theForm").appendChild(newdiv);
                    alreadyPressed = true;
                }
            }
                                            //Tutor
            else if(document.getElementById('radiobutton2').checked)
            {
                //Get the email, password, student, and tutor value
                let req = {
                    email: signupEmail.value, 
                    password: signupPassword.value,
                    student: false, 
                    tutor: true
                }
                axios.post('http://localhost:5000/auth/signup', req)
                .catch(err => {
                    console.log(err); 
                })
                console.log("Tutor signup work!");
                if (!alreadyPressed)
                {
                    var newdiv = document.createElement('div');
                    newdiv.innerHTML = ('<div id= "confirmAppend"><span="inner">Confirmation Email Sent<br /></span></div>');
                    document.getElementById("theForm").appendChild(newdiv);
                    alreadyPressed = true;
                }
            }
            else
                alert('Select if tutor or student');
        }
        //User clicks on the Sign in link
        else if (state.button === 2)
        {
            window.location.href = '/SigninPage';
        }
    };
    return (
        <div id="signupDiv">
            <img class = "img-rounded" src = {otLogo} alt ="otLogo"/>    
            <br></br>

            <form method="post" action="/email-activate" onSubmit={signupProcess} id = "formID">
                <span id="inner-title">Sign Up</span><br />
                <input type="email" id="signupEmail" placeholder="Type Email" ref={ (c) => signupEmail = c} /><br />
                <input type="password" id="signupPassword" placeholder="Type Password" ref={ (c) => signupPassword = c} /><br />
                <input type="password" id="confirmPassword" placeholder="Confirm Password" ref={ (c) => confirmPassword = c} /><br />


                <div id = "radiobuttons">

                    <label class="form-check-label" for="exampleRadios2">
                        <input class="form-check-input" type="radio" name="radiobutton" id="radiobutton1" value="Student"></input>
                    I am a Student</label>
                    
                    <label class="form-check-label" for="exampleRadios2">
                        <input class="form-check-input" type="radio" name="radiobutton" id="radiobutton2" value="Tutor"></input>
                    I am a Tutor</label>
                </div>

                <input type="submit" id="signupButton" class="buttons" value="Sign up" onClick={() => state.button = 1} />

                
                <label>Already have an account?<input type="submit" id="defferSignIn" class="buttons" value="Sign in" onClick={() => state.button = 2}/></label>
                
                <div id="confirmNotify">
                <form id="theForm">
                    <text></text>
                </form>
            </div>
            </form>
            
    <span id="signupResult">{message}</span>
        </div>
    );
};

export default Signup;