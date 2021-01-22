import React from 'react';
import {Link} from 'react-router-dom';
import './Pages.css';
<<<<<<< Updated upstream
import logo from './logo.png';
=======
import {useState, useEffect} from 'react';
import firebase from './FireBaseConnection';
>>>>>>> Stashed changes

const SignIn  = () => {

    //states for the user, email and password
    //set to an empty string
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //states for the error messages for the email and password
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    //state for if there is already an account
    //initially set to false using useState hook
    const [accountPresent, setAccountPresent] = useState(false);

    //function to handle the login
    const login = () => {
        //use firebase methods to authenticate a user when login
        //using signInWithEmailAndPassword
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

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