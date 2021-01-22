import React from 'react';
import {Link} from 'react-router-dom';
import './Pages.css';
import logo from './logo.png';
import {useState, useEffect} from 'react';

const SignUp  = () => {

    //function to handle the signUp
    const signUp = () => {
        //use firebase methods to authenticate a user when signing in
        //using signInWithEmailAndPassword
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

        //error handling
        .catch((err) => {
            switch (err.code) {

                //error codes for invalid email
                case "auth/email-already-in-use":
                case "auth/invalid-email":

                    //if any of these errors arise
                    //setEmailError state to hold a message
                    setEmailError(err.message);
                    break;

                //error codes for invalid password
                case "auth/weak-password":

                    //if any of these errors arise
                    //setPasswordError state to hold a message
                    setPasswordError(err.message);
                    break;

            };
        });

    };


    return (
        <div className= "signup">
            <div>
                <img src={logo} alt="" class="logoimg" />
                <p class="text" >Sign up to see photos from people tha inspire you</p>
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