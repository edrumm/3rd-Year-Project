import React from 'react';
import {Link} from 'react-router-dom';

const SignIn  = () => {

    return (
        <div className= "signInWelcome">
            <div>
                <h1>Sign In</h1>
                <h2>Hi there! Nice to see you again.</h2>
            </div>

            <div>
                <p>Email</p>
                <input type="text" id="emailInput" placeholder="Enter Email" />
                <p>Password</p>
                <input type="password" id="passwordInput" placeholder="Password" />
                <button id="signInButton" class="signInButton" onclick="submitBtnPress()">Sign In</button>

                <div className="whiteSpace"></div>
                <button id="signInButton" class="signInButton" onclick="submitBtnPress()"><Link to="/PictureThat">Guest</Link></button>
                <p>Forgot Password?</p>

            </div>
            
        </div>
        
    )
}

export default SignIn;

//https://www.youtube.com/watch?v=hjR-ZveXBpQ