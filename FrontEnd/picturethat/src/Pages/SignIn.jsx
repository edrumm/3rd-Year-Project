import React from 'react';
import {Link} from 'react-router-dom';
import './Pages.css';

const SignIn  = () => {

    return (
        <div className= "signInWelcome">
            <div>
                <h1>Sign In</h1>
                <p>Hi there! Nice to see you again.</p>
            </div>

            <div className="whiteSpace"></div>

            <div>
                <input type="text" id="emailInput" placeholder="Enter Email" />
                <input type="password" id="passwordInput" placeholder="Password" />
                <button id="signInButton" class="signInButton" onclick="submitBtnPress()"><Link to="/PictureThat">Sign In</Link></button>

                <div className="whiteSpace"></div>

                <p className="or"><span>OR</span>
                    <div className="whiteSpace"></div>
                    <button id="signInButton" class="signInButton" onclick="submitBtnPress()"><Link to="/PictureThat">Guest</Link></button>
                </p>

                <Link to="/ForgotPassword">Forgot Password?</Link> <Link to="/SignUp">Sign Up</Link>

            </div>
            
        </div>
        
    )
}

export default SignIn;

//https://www.youtube.com/watch?v=hjR-ZveXBpQ