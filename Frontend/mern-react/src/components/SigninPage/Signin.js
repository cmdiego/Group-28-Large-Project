import React, { useState } from 'react';
import './SignIn.css';

function Signin()
{
    var signinEmail;
    var signinPassword;
    const [message,setMessage] = useState('');
    const state = {
        button: 1
    };

    const signupProcess = async event =>
    {
        event.preventDefault();
        if (state.button == 4)
        {
            window.location.href = '/SignupPage';
            return;
        }
        alert('signing in ' + signinEmail.value + ' ' + signinPassword.value);
    };


    return (
        <div id="signupDiv">
            <form onSubmit={signupProcess} id = "formID">
                <span id="inner-title">Sign In</span><br />
                <input type="email" id="signinEmail" placeholder="Type Email" ref={ (c) => signinEmail = c} /><br />
                <input type="password" id="signinPassword" placeholder="Type Password" ref={ (c) => signinPassword = c} /><br />
                <input type="submit" id="signinButton" class="buttons" value="Sign in" onClick={() => state.button = 3} />
                <label>Dont have an account?<input type="submit" id="defferSignIn" class="buttons" value="Sign up" onClick={() => state.button = 4} /></label>
            </form>
    <span id="signupResult">{message}</span>
        </div>
    );
};

export default Signin;