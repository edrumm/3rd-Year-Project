import React from 'react';
import {Link} from 'react-router-dom';
import './Pages.css';
import logo from './logo.png';
import {useState, useEffect} from 'react';
import fire from '../FireBaseConnection/fire';

const SignUp  = (propsSignUp) => {

    //states for the user, email and password
    //set to an empty string
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //states for the error messages for the email and password
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    //function to clears the inputs of the email and password
    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }

    //function to clears the error message of the email and password
    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    //function to handle the signUp
    const signingUp = () => {

        //call clearErrors
        clearErrors();
                
        //use firebase methods to authenticate a user when signing in
        //using signInWithEmailAndPassword
        fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        
        //error handling
        .catch((err) => {
            switch (err.code) {
        
            //error codes for email already in use or an invalid email
            case "auth/email-already-in-use":
            case "auth/invalid-email":
        
            //if any of these errors arise
            //setEmailError state to hold a message
            setEmailError(err.message);
            break;
        
            //error codes for weak password
            case "auth/weak-password":
        
                //if any of these errors arise
                //setPasswordError state to hold a message
                setPasswordError(err.message);
                break;
            };
    }); 
    }

    //function to authenticate a user and to check if a user with
    //such credentials already exists
    const authorizeUser = () => {
        fire.auth().onAuthStateChanged(user => {

            //if there is a user setUser to that user
             if(user){
                 //clear the inputs
                 clearInputs();
                 setUser(user);
             }

             //if there is no user set user to an empty string
             if(!user){
                 setUser('');
             };
        });
    };

    useEffect(() => {
        authorizeUser();
    }, []);
    
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
                    onclick={signingUp}>
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