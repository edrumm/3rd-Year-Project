import React from 'react';
import {Link} from 'react-router-dom';
import './Pages.css';
import logo from './logo.png';
import {useState} from 'react';
import Footer from '../components/footer';
import {useHistory} from 'react-router-dom';

import {Login, Signup} from '../firebase';
import validate from '../validate';

const SignUp  = () => {
    const Swal = require('sweetalert2');

    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmEmail, setConfirmEmail] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');

    const[emailError, setEmailError] = useState({});
    const[passwordError, setPasswordError] = useState({});
    const[usernameError, setUsernameError] = useState({});

    const history = useHistory();

    const checkUsername = (userNameInput) => {
        const usernameRequirements = new RegExp (/^[a-z\d]{5,20}$/i);
        return usernameRequirements.test(userNameInput);
    }

    const checkEmail = (userEmailInput) => {

        //link for the regex used
        //https://stackoverflow.com/questions/16200965/regular-expression-validate-gmail-addresses

        const emailRequirements = new RegExp (/([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g);
        return emailRequirements.test(userEmailInput);
    }

    const checkPassword = (userPasswordInput) => {

        //link for regex used
        //https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a

        const passwordRequirements = new RegExp (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/);
        return passwordRequirements.test(userPasswordInput);
    }
    const validateForm = (e) => {
        
        let isValid = true;

         //arrays to hold errors set to empty array
         const emailError = {};
         const passwordError = {};
         const usernameError = {};

        if(!checkUsername(username)){
            usernameError.InvalidCharacters = "Username must be longer than 5 characters";
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: usernameError.InvalidCharacters,
             });     
        }

         if (!checkEmail(email)) {
                 emailError.InvalidCharacters = "Your Email address is incorrect. Try again.";
                 Swal.fire({
                     icon: 'error',
                     title: 'Oops...',
                     text: emailError.InvalidCharacters,
                   });
         }
 
         if(!(email === confirmEmail)){
             emailError.EmailMismatch = "Re-entered email MUST be the same as email";
             Swal.fire({
                 icon: 'error',
                 title: 'Oops...',
                 text: emailError.EmailMismatch,
               });
         }
 
         if((checkEmail(email) && checkEmail(confirmEmail)) && (email === confirmEmail)){
             console.log("Valid email address");
         }

         if(!checkPassword(password)){
             passwordError.InvalidCharacters = "Password MUST contain at least one number/lowercase/uppercase letter and be at least 6 characaters in length";
             Swal.fire({
                 icon: 'error',
                 title: 'Oops...',
                 text: passwordError.InvalidCharacters,
               });
         }
 
         if(!(password === confirmPassword)){
             passwordError.PasswordMismatch = "Re-entered password MUST be the same as password";
             Swal.fire({
                 icon: 'error',
                 title: 'Oops...',
                 text: passwordError.PasswordMismatch,
               });
         }
 
         if((checkPassword(password) && checkPassword(confirmPassword)) && (password === confirmPassword)){
             console.log("Valid password");
         }
 
         if((checkPassword(password) && checkPassword(confirmPassword)) && (password === confirmPassword) && (checkEmail(email) && checkEmail(confirmEmail)) && (email === confirmEmail) && checkUsername(username)){
             isValid = true;
             console.log(email);
             console.log(password);
         }
         else{
             isValid = false;
         }
 
         setEmailError(emailError);
         setPasswordError(passwordError);
         setUsernameError(usernameError);
         console.log(isValid);

        try {
          let credentials = {
              username: username,
              email: email,
              password: password,
              confirmPassword: confirmPassword,
              confirmEmail: confirmEmail
          };

          validate.signup(credentials);
          isValid = true;

        } catch (err) {
          isValid = false;
        }

        if (isValid) {

            // try to signup
            Signup(email, password, username)
            .then(() => {
              // successful

              Login(email, password)
              .then(() => {
                history.push("/PictureThat");
              })
              .catch(err => {
                console.error(err);
                history.push('/');
              });

            })
            .catch(err => {
              // unsucessful
              console.error(`Signup error: ${err}`);
              alert('There was a problem signing up, please try again');

              history.push('/');
            });

            return true;

        } else {
          return false;
        }

    }

    return (
        <>
        <div className= "signup">
            <div>
                <img src={logo} alt="" className="logoimg" />
                <p className="text">Sign up to see photos that are tailored to you!</p>
            </div>

            <div>
                <form>

                    <input
                        type="text"
                        id="UsernameInput"
                        className="inputbox"
                        placeholder="Username"
                        autoFocus required
                        value= {username}
                        onChange= {(e) => {setUsername(e.target.value)}}
                    />

                    <input
                        type="text"
                        id="emailInput"
                        className="inputbox"
                        placeholder="Email Address"
                        autoFocus required
                        value= {email}
                        onChange= {(e) => {setEmail(e.target.value)}}
                    />

                    <input
                        type="text"
                        id="CemailInput"
                        className="inputbox"
                        placeholder="Re-enter Email Address"
                        autoFocus required
                        value= {confirmEmail}
                        onChange= {(e) => {setConfirmEmail(e.target.value)}}
                    />

                    <input
                        type="password"
                        id="passwordInput"
                        className="inputbox"
                        placeholder="Enter Password"
                        autoFocus required
                        value= {password}
                        onChange= {(e) => {setPassword(e.target.value)}}
                    />

                    <input
                        type="password"
                        id="CpasswordInput"
                        className="inputbox"
                        placeholder="Re-enter Password"
                        autoFocus required
                        value= {confirmPassword}
                        onChange= {(e) => {setConfirmPassword(e.target.value)}}
                    />

                    <input
                        type="checkbox"
                        id="termsAndConditions"
                        className="tc"
                        value="Accept"
                        required
                    />

                    <label className="termsAndConditions"> By sining up, you agree to our <br></br> <Link to="/PictureThat/TermsAndConditions">Terms of Services and Privacy Policy</Link></label><br></br>

                        <button
                            id="signInButton"
                            onClick= {validateForm}
                            className="button">Sign Up
                        </button>

                    <p>Have an Account? <Link to="/SignIn"> Sign In</Link></p>
                    </form>
            </div>

        </div>
        <Footer />
        </>
    )
}

export default SignUp;

//https://www.youtube.com/watch?v=hjR-ZveXBpQ
//https://www.w3schools.com/tags/att_input_type_checkbox.asp
//https://www.youtube.com/watch?v=cFgoSrOui2M
