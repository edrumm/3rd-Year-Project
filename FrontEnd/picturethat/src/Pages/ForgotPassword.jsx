import React from 'react';
import {Link} from 'react-router-dom';
import './Pages.css';

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
                <input type="email" className="inputbox" id="emailInput" placeholder="Email Address" />
                <button id="signInButton" class="signInButton" onclick="submitBtnPress()"><Link to="/SignIn">Submit</Link></button>
            </form>
        </div>
    );
};

export default ForgotPassword;

//https://www.youtube.com/watch?v=hjR-ZveXBpQ