import React from 'react';
import {Link} from 'react-router-dom';

const ForgotPassword  = () => {

    return (
        <div>
            <div className= "signInWelcome">
                <h1>Forgot Password</h1>
            </div>

                <p>Email</p>
                <input type="text" id="emailInput" placeholder="Email Address" />
                <button id="signInButton" class="signInButton" onclick="submitBtnPress()"><Link to="/SignIn">Submit</Link></button>
            
        </div>
    );
};

export default ForgotPassword;

//https://www.youtube.com/watch?v=hjR-ZveXBpQ