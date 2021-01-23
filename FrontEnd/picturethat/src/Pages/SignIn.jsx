import React from 'react';
import {Link} from 'react-router-dom';
import './Pages.css';
import logo from './logo.png';

const SignIn  = () => {

    return (
        
        <div className= "signInWelcome">
            <div>
                <img src={logo} alt="" class="logoimg" />
                <p class="text" >Hi there! Nice to see you again.</p>
            </div>

            <div className="whiteSpace"></div>

            <div>
                <input type="text" id="emailInput" class="inputbox" placeholder="Enter Email" />
                <input type="password" id="passwordInput" class="inputbox" placeholder="Password" />
                <button id="signInButton" class="button" onclick="submitBtnPress()"><Link to="/PictureThat">Sign In</Link></button>

                <div className="whiteSpace"></div>

                <p className="or"><span>OR</span>
                    <div className="whiteSpace"></div>
                </p>
                <button id="signInButton" class="button" onclick="submitBtnPress()"><Link to="/PictureThat">Guest</Link></button>

                <Link to="/ForgotPassword">Forgot Password?</Link> <Link to="/SignUp">Sign Up</Link>

            </div>

        </div>
        

        
        
    )
}

export default SignIn;

//https://www.youtube.com/watch?v=hjR-ZveXBpQ