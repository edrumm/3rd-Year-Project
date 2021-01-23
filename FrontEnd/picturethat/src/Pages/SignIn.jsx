import React from 'react';
import {Link} from 'react-router-dom';
import './Pages.css';
import logo from './logo.png';
import {useState, useEffect} from 'react';
import fire from '../FireBaseConnection/fire';


const SignIn  = () => {

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
    
    //function to handle the login
    const login = () => {

        //call clearErrors
        clearErrors();

        //use firebase methods to authenticate a user when login
        //using signInWithEmailAndPassword
        fire
        .auth()
        .signInWithEmailAndPassword(email, password)

        //error handling
        .catch((err) => {
            switch (err.code) {

                //error codes for invalid email
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":

                    //if any of these errors arise
                    //setEmailError state to hold a message
                    setEmailError(err.message);
                    break;

                //error codes for invalid password
                case "auth/wrong-password":

                    //if any of these errors arise
                    //setPasswordError state to hold a message
                    setPasswordError(err.message);
                    break;
            };
        });

    };

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
                    autoFocus 
                    required
                     value={email} 
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
                    onClick={login}>
                    <Link to="/PictureThat">Sign In</Link>
                </button>

                <div className="whiteSpace"></div>

                <p className="or"><span>OR</span>
                    <div className="whiteSpace"></div>
                </p>

                <button 
                    id="signInButton" 
                    class="button" 
                    onClick="submitBtnPress()">
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