import React from 'react';
import {Link} from 'react-router-dom';
import './Pages.css';
import logo from './logo.png';

const SignUp  = (propsSignUp) => {

    const {email, password, setEmail, setPassword, signUp, emailError, passwordError} = propsSignUp;

    return (
        <div className= "signup">
            <div>
                <img src={logo} alt="" class="logoimg" />
                <p class="text" >Sign up to see photos from people tha inspire you</p>
            </div>

            <div>
                <input 
                    type="text" 
                    id="emailInput" 
                    class="inputbox" 
                    placeholder="Email Address"
                    autoFocus required 
                />

                <input 
                    type="text" 
                    id="emailInput" 
                    class="inputbox" 
                    placeholder="Re-enter Email Address" 
                    autoFocus required value={email} 
                    onChange = {(e) => setEmail(e.target.value)}
                />

                <p className= 'errorMessage'>{emailError}</p>

                <input 
                    type="password" 
                    id="passwordInput" 
                    class="inputbox" 
                    placeholder="Enter Password" 
                    autoFocus required
                />

                <p className= 'errorMessage'>{passwordError}</p>

                <input 
                    type="password" 
                    id="passwordInput" 
                    class="inputbox" 
                    placeholder="Re-enter Password"
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)} 
                />

                <input 
                    type="checkbox" 
                    id="termsAndConditions" 
                    name="termsAndConditions" 
                    value="Accept" 
                />

                <label for="termsAndConditions"> I agree to the Terms of Services and Privacy Policy</label><br></br>

                {/*need to add hyperlink text to Terms of Services and Privacy Policy */}

                <button 
                    id="signInButton" 
                    class="signInButton" 
                    onclick={signUp}>
                    <Link to="/PictureThat">Continue</Link>
                </button>
                <p>Have an Account?</p><Link to="/SignIn">Sign In</Link>

            </div>
            
        </div>
        
    )
}

export default SignUp;

//https://www.youtube.com/watch?v=hjR-ZveXBpQ
//https://www.w3schools.com/tags/att_input_type_checkbox.asp
//https://www.youtube.com/watch?v=cFgoSrOui2M