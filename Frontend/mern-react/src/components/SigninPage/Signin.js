import React, { useState } from 'react';
import './SignIn.css';
import otLogo from '../../otLogo.png';
const axios = require('axios');

function Signin()
{
    var signinEmail;
    var signinPassword;
    const [message,setMessage] = useState('');
    const state = {
        button: 1
    };

    const signinProcess = async event =>
    {
        event.preventDefault();
        
        let req = {
            email: signinEmail.value, 
            password: signinPassword.value
        }

        if (state.button === 1)
        {
            axios.post('http://localhost:5000/auth/signin', req)
            .then(function(resp) {
                const { accessToken } = resp.data;
                localStorage.setItem('jwtToken', accessToken);
                const status = resp.status; 
                if(status == 200)
                     window.location = '/HomePage';
            })
                .catch(err => {
                    console.log(err); 
                })
                
                axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('jwtToken');
            //alert('signing in ' + signinEmail.value + ' ' + signinPassword.value);
        }
        else if (state.button === 2)
        {
            window.location.href = '/SignupPage';
        }
        else if(state.button === 3) {
            window.location.href = '/ForgotPassword'; // '/ForgotPassword'
        }
    };


    return (
        <div id="signinDiv">
            <img class = "img-rounded" src = {otLogo} alt ="otLogo"/>    
            <br></br>
            <form onSubmit={signinProcess} id = "formID">
                <span id="inner-title">Sign In</span><br />
                <input type="email" id="signinEmail" placeholder="Type Email" ref={ (c) => signinEmail = c} /><br />
                <input type="password" id="signinPassword" placeholder="Type Password" ref={ (c) => signinPassword = c} /><br />
                <input type="submit" id="signinButton" class="buttons" value="Sign in" onClick={() => state.button = 1} />
                <label>Dont have an account?<input type="submit" id="defferSignIn" class="buttons" value="Sign up" onClick={() => state.button = 2} /></label>
                <input type="submit" id="defferSignIn" class="buttons" value="Forgot Password?" onClick={() => state.button = 3} />
            </form>
    <span id="signinResult">{message}</span>
        </div>
    );
};

export default Signin;