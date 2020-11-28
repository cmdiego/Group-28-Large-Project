import React, {Component, useState } from 'react';
import {useParams}  from "react-router-dom";
import './RequestPW.css';

const axios = require('axios');

function RequestPW()
{
    var newpassword;
    var confirmPassword;
    const [message,setMessage] = useState('');
    const state = {
        button: 1
    };

    let {token}  = useParams();

    const changePW = async event =>
    {
        event.preventDefault();

        if(newpassword.value !== confirmPassword.value) {
            alert('Passwords don\'t match');
            console.log("Error password incorrect"); 
        } 
        if(newpassword.value.length < 6) {
            alert('Password has be at least 6 characters long!');
            console.log('Password has be at least 6 characters long!'); 
            return;        }
        let req = {
            password: newpassword.value, 
            token: token
        }

        if (state.button === 1)
        {
            axios.post('http://localhost:5000/auth/reset-password/', req)
            .then(function(resp) {
                const status = resp.status; 
                alert(status + ": Password Updated")
                /*if(status == 200)
                     window.location = '/HomePage';*/
            })
                .catch(err => {
                    console.log(err); 
                })
        }
        else if (state.button === 2)
        {
            window.location.href = '/SigninPage';
        }
        else if(state.button === 3) {
            window.location.href = '/SignupPage'; // '/ForgotPassword'
        }
    };

    return (
        <div id="signinDiv">
            <form onSubmit={changePW} id = "formID">
                <span id="inner-title">Change Password</span><br />
                <input type="password" id="signupPassword" placeholder="Type Password" ref={ (c) => newpassword = c} /><br />
                <input type="password" id="confirmPassword" placeholder="Confirm Password" ref={ (c) => confirmPassword = c} /><br />                
                <input type="submit" id="signinButton" class="buttons" value="Update" onClick={() => state.button = 1} />
                <label>Existing User?<input type="submit" id="defferSignIn" class="buttons" value="Sign in" onClick={() => state.button = 2} /></label>
                <label>Dont have an account?<input type="submit" id="defferSignIn" class="buttons" value="Sign up" onClick={() => state.button = 3} /></label>

            </form>
    <span id="signinResult">{message}</span>
        </div>
    );
}
export default RequestPW;