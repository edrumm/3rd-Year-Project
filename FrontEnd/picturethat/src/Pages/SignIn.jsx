import React from 'react';
import {Link} from 'react-router-dom';
import './Pages.css';
import logo from './logo.png';
import {useState} from 'react';
import Footer from '../components/footer';
import {useHistory} from 'react-router-dom';
import firebase from '../firebase';

const SignIn  = () => {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const[emailError, setEmailError] = useState({});
    const[passwordError, setPasswordError] = useState({});

    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
    }

    const history = useHistory();

    const checkEmail = (userEmailInput) => {

        //link for the regex used
        //https://sigparser.com/developers/email-parsing/regex-validate-email-address/

        const emailRequirements = new RegExp (/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        return emailRequirements.test(userEmailInput);
    }

    const checkPassword = (userPasswordInput) => {
        const passwordRequirements = new RegExp (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/);
        return passwordRequirements.test(userPasswordInput);
    }
    const validateForm = () => {

        //arrays to hold errors set to empty array
        const emailError = {};
        const passwordError = {};

        //boolean isValid to check if credentials are valid set to true
        let isValid = true;


        /*if (!checkEmail(email)) {
                isValid = false;
                emailError.InvalidCharacters = "Your Email address is incorrect. Try again.";
                alert(emailError.InvalidCharacters);
        }
        else{
            isValid = true;
            console.log("Valid email address");
            console.log(email);
        }

        if(!checkPassword(password)){
            isValid = false;
            passwordError.InvalidCharacters = "Password MUST contain at least one number/lowercase/uppercase letter and be at least 6 characaters in length";
            alert(passwordError.InvalidCharacters);
        }
        else{
            isValid = true;
            console.log("Valid password");
            console.log(password);
        }*/


        if(isValid) {

            firebase.login(email, password)
            .then(res => {
              history.push("/PictureThat");
            })
            .catch(err => {
              console.error(err);
              history.push('/');
            });

            // Call this to logout:
            // firebase.logout();

        }

        if(!isValid) {

        }

        setEmailError(emailError);
        setPasswordError(passwordError);


        //fetch block that will take a username and password and return a value for
        //if there is a user in the database that matches those credentials.

        /* TO DO : Add functionality for this to take user to the landing page if all clear*/

    }


    return (
        <>
        <div className= "signInWelcome">
            <div>
                <img src={logo} alt="" className="logoimg" />
                <p className="text" >Hi there! Nice to see you again.</p>
            </div>

            <div className="whiteSpace"></div>

            <div>
                <form onSubmit = {onSubmit}>
                <input
                    type="text"
                    id="emailInput"
                    className="inputbox"
                    placeholder="Enter Email"
                    autoFocus
                    required
                    value= {email}
                    onChange= {(e) => {setEmail(e.target.value)}}
                />

                <input
                    type="password"
                    required
                    id="passwordInput"
                    className="inputbox"
                    placeholder="Password"
                    value= {password}
                    onChange= {(e) => {setPassword(e.target.value)}}
                />

                <button
                    id="signInButton"
                    className="button"
                    type= "submit"
                    onClick= {() => {validateForm(); }}>
                    Sign In
                </button>

                <div className="whiteSpace"></div>

                <p className="or"><span>OR</span>
                    <div className="whiteSpace"></div>
                </p>

                {/* <button
                    id="signInButton"
                    className="button">
                    <Link to="/PictureThat">Guest</Link>
                </button> */}

                <Link to="/ForgotPassword">Forgot Password?</Link>
                <Link to="/SignUp"> Sign Up</Link>
                </form>
            </div>
        </div>
        <Footer />
        </>
    )


}

export default SignIn;

//https://www.youtube.com/watch?v=hjR-ZveXBpQ
//https://www.youtube.com/watch?v=cFgoSrOui2M
