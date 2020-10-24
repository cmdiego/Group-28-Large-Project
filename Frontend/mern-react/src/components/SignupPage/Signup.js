import React, { useState } from 'react';

function Signup()
{
    var signupEmail;
    var signupPassword;
    var confirmPassword;
    const [message,setMessage] = useState('');
    const state = {
        button: 1
    };

    const signupProcess = async event =>
    {
        event.preventDefault();
        if (state.button == 1){
            if (!(signupPassword.value === confirmPassword.value))
            {
                alert('Passwords don\'t match');
                return;
            }
            alert('signing in as Student' + ' ' + signupEmail.value + ' ' + signupPassword.value + ' ' + confirmPassword.value);
        }
        else if (state.button == 2){
            if (!(signupPassword.value === confirmPassword.value))
            {
                alert('Passwords don\'t match');
                return;
            }
            alert('signing in as Tutor' + ' ' + signupEmail.value + ' ' + signupPassword.value + ' ' + confirmPassword.value);
        }
    };


    return (
        <div id="signupDiv">
            <form onSubmit={signupProcess}>
                <span id="inner-title">Sign Up</span><br />
                <input type="text" id="signupEmail" placeholder="Type Email" ref={ (c) => signupEmail = c} /><br />
                <input type="password" id="signupPassword" placeholder="Type Password" ref={ (c) => signupPassword = c} /><br />
                <input type="password" id="confirmPassword" placeholder="Confirm Password" ref={ (c) => confirmPassword = c} /><br />
                <input type="submit" id="signupStudentButton" class="buttons" value="Signup as Student" onClick={() =>state.button = 1} />
                <input type="submit" id="signupTutorButton" class="buttons" value="Signup as Tutor" onClick={() => state.button = 2} />
            </form>
    <span id="signupResult">{message}</span>
        </div>
    );
};

export default Signup;