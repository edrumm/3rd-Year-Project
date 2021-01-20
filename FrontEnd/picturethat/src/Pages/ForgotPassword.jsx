import React from 'react';

const ForgotPassword  = () => {

    return (
        <div>
            <div className= "signInWelcome">
                <h1>Forgot Password</h1>
            </div>

                <p>Email</p>
                <input type="text" id="emailInput" placeholder="Email Address" />
                <button id="signInButton" class="signInButton" onclick="submitBtnPress()">Submit</button>
            
        </div>
    );
};

export default ForgotPassword;

//https://www.youtube.com/watch?v=hjR-ZveXBpQ