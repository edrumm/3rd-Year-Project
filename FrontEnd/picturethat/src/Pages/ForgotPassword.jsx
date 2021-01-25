import React from 'react';
import {Link} from 'react-router-dom';

const ForgotPassword  = () => {

    const onSubmitForgot = (e) => {
        e.preventDefault();
    }

    return (
        <div className= "signInWelcome">
            <form onSubmit = {onSubmitForgot}>
            <div>
                <h1>Forgot Password</h1>
            </div>

                <p>Email</p>
                <input type="email" id="emailInput" placeholder="Email Address" />
                <button id="signInButton" class="signInButton" onclick="submitBtnPress()"><Link to="/SignIn">Submit</Link></button>
            </form>
        </div>
    );
};

export default ForgotPassword;

//https://www.youtube.com/watch?v=hjR-ZveXBpQ