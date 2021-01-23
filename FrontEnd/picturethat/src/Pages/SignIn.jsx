import React from 'react';
import {Link} from 'react-router-dom';
import './Pages.css';
import logo from './logo.png';


const SignIn  = (propsSignIn) => {

    const {email, password, setEmail, setPassword, login, emailError, passwordError} = propsSignIn;

    return (
        <div className= "signInWelcome">
            <div>
                <img src={logo} alt="" class="logoimg" />
                <p class="text" >Hi there! Nice to see you again.</p>
            </div>

            <div className="whiteSpace"></div>

            <div>

                {/*the requirements for the input of the email/username */}
                {/*adding an event to give setEmail a value */}
                <input 
                    type="text" 
                    id="emailInput" 
                    class="inputbox" 
                    placeholder="Enter Email"
                    autoFocus required value={email} 
                    onChange = {(e) => setEmail(e.target.value)}
                />
                 
                <p className= 'errorMessage'>{emailError}</p>

                {/*the requirements for the input of the email/username */}
                {/*adding an event to give setEmail a value */}
                <input 
                    type="password"
                    required 
                    id="passwordInput" 
                    class="inputbox" 
                    placeholder="Password"
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)} 
                />

                <p className= 'errorMessage'>{passwordError}</p>

                <button 
                    id="signInButton" 
                    class="button" 
                    onclick={login}>
                    <Link to="/PictureThat">Sign In</Link>
                </button>

                <div className="whiteSpace"></div>

                <p className="or"><span>OR</span>
                    <div className="whiteSpace"></div>
                </p>

                <button 
                    id="signInButton" 
                    class="button" onclick="submitBtnPress()">
                    <Link to="/PictureThat">Guest</Link>
                </button>

                <Link to="/ForgotPassword">Forgot Password?</Link>
                <Link to="/SignUp">Sign Up</Link>

            </div>
            
        </div>
        
    )
}

export default SignIn;

//https://www.youtube.com/watch?v=hjR-ZveXBpQ
//https://www.youtube.com/watch?v=cFgoSrOui2M