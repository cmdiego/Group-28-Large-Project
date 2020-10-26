import React, { useState } from 'react';
import './SignUp.css';

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
            alert('signing in as '+  + ' ' + signupEmail.value + ' ' + signupPassword.value + ' ' + confirmPassword.value);
        }

        else if (state.button == 3){
            if (!(signupPassword.value === confirmPassword.value))
            {
                alert('Passwords don\'t match');
                return;
            }

            if(document.getElementById('radiobutton1').checked)
                alert('signing in as student' + ' ' + signupEmail.value + ' ' + signupPassword.value + ' ' + confirmPassword.value);
            

            else if(document.getElementById('radiobutton2').checked)
                alert('signing in as tutor' + ' ' + signupEmail.value + ' ' + signupPassword.value + ' ' + confirmPassword.value);

            else
                alert('Select if tutor or student');

        }
        
        else if (state.button == 4)
        {
            window.location.href = '/SigninPage';

        }

    };


    return (
        <div id="signupDiv">
            <form onSubmit={signupProcess} id = "formID">
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

                <input type="submit" id="signupButton" class="buttons" value="Sign up" onClick={() => state.button = 3} />

                
                <label>Already have an account?<input type="submit" id="defferSignIn" class="buttons" value="Sign in" onClick={() => state.button = 4}/></label>
                

            </form>
    <span id="signupResult">{message}</span>
        </div>
    );
};

export default Signup;