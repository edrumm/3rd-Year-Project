import React from 'react';

const SignUp  = () => {

    return (
        <div className= "signInWelcome">
            <div>
                <h1>Sign Up</h1>
            </div>

            <div>
                <p>Email</p>
                <input type="text" id="emailInput" placeholder="Email Address" />
                <input type="text" id="emailInput" placeholder="Re-enter Email Address" />

                <p>Password</p>
                <input type="password" id="passwordInput" placeholder="Enter Password" />
                <input type="password" id="passwordInput" placeholder="Re-enter Password" />



                <button id="signInButton" class="signInButton" onclick="submitBtnPress()">Continue</button>
                <p>Have an Account?</p> {/*need to add hyperlink text to send to signIn Page */}

            </div>
            
        </div>
        
    )
}

export default SignUp;

//https://www.youtube.com/watch?v=hjR-ZveXBpQ
//https://www.w3schools.com/tags/att_input_type_checkbox.asp