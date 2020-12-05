import React, { useState } from 'react';
import './ForgotPassword.css';
import otLogo from '../../otLogo.png';
const axios = require('axios');

function ForgotPassword()
{
    var signinEmail;
    var signinPassword;
    const [message,setMessage] = useState('');
    const state = {
        button: 1
    };

    const fp = async event =>
    {
        event.preventDefault();
        
        let req = {
            email: signinEmail.value, 
        }

        if (state.button === 1)
        {
            axios.post('http://localhost:5000/auth/request-password', req)
            .then(function(resp) {
                const status = resp.status; 
                //alert(status + ": Email Sent")
                if(status == 200)
                     window.location = '/SigninPage';
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
            <img class = "img-rounded" src = {otLogo} alt ="otLogo"/>    
            <form onSubmit={fp} id = "formID">
                <span id="inner-title">Forgot Password</span><br />
                <input type="email" id="signinEmail" placeholder="Type Email" ref={ (c) => signinEmail = c} /><br />
                <input type="submit" id="signinButton" class="buttons" value="Password Request" onClick={() => state.button = 1} />
                <label>Existing User?<input type="submit" id="defferSignIn" class="buttons" value="Sign in" onClick={() => state.button = 2} /></label>
                <label>Dont have an account?<input type="submit" id="defferSignIn" class="buttons" value="Sign up" onClick={() => state.button = 3} /></label>

            </form>
    <span id="signinResult">{message}</span>
        </div>
    );
}
export default ForgotPassword;