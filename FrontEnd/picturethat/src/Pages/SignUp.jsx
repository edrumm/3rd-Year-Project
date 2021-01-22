import React from 'react';
import {Link} from 'react-router-dom';
import './Pages.css';

const SignUp  = () => {

    return (
        <div className= "signup">
            <div>
                <h1>PictureThat</h1>
                <p>Sign up to see photos from people tha inspire you</p>
            </div>

            <div>
                <input type="text" id="emailInput" class="inputbox" placeholder="Email Address" />
                <input type="text" id="emailInput" class="inputbox" placeholder="Re-enter Email Address" />

                <input type="password" id="passwordInput" class="inputbox" placeholder="Enter Password" />
                <input type="password" id="passwordInput" class="inputbox" placeholder="Re-enter Password" />

                <input type="checkbox" id="termsAndConditions" name="termsAndConditions" value="Accept" />
                <label for="termsAndConditions"> I agree to the Terms of Services and Privacy Policy</label><br></br>
                {/*need to add hyperlink text to Terms of Services and Privacy Policy */}

                <button id="signInButton" class="signInButton" onclick="submitBtnPress()"><Link to="/PictureThat">Continue</Link></button>
                <p>Have an Account?</p><Link to="/SignIn">Sign In</Link>

            </div>
            
        </div>
        
    )
}

export default SignUp;

//https://www.youtube.com/watch?v=hjR-ZveXBpQ
//https://www.w3schools.com/tags/att_input_type_checkbox.asp