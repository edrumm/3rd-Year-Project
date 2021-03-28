import React from 'react';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import "../Pages/Settings.css";
import firebase from "../firebase.js";

const ChangeEmail = () => {
    const Swal = require('sweetalert2');

    const[changeEmail, setChangeEmail] = useState('');
    const[confirmChangeEmail, setConfirmChangeEmail] = useState('');

    const[emailChangeError, setEmailChangeError] = useState({});

    //boolean isValid to check if credentials are valid set to true
    var isValid = false;

    const checkEmail = (userEmailInput) => {

        //link for the regex used
        //https://sigparser.com/developers/email-parsing/regex-validate-email-address/

        const emailRequirements = new RegExp (/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        return emailRequirements.test(userEmailInput);
    }

    const validateEmail = (e) => {

        const emailError = {};

        if (!checkEmail(changeEmail)) {
            emailError.InvalidCharacters = "Your Email address is incorrect. Try again.";
            isValid = false;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: emailError.InvalidCharacters,
              });
        }

        if(!(changeEmail === confirmChangeEmail)){
            emailError.EmailMismatch = "Re-entered email MUST be the same as email";
            isValid = false;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: emailError.InvalidCharacters,
              });
        }
        
        if((checkEmail(changeEmail) && checkEmail(confirmChangeEmail)) && (changeEmail === confirmChangeEmail)){
            console.log("Valid email address");
            isValid = true;
        }

        setEmailChangeError(emailChangeError);
        if(isValid===true){
            firebase.changeUserEmail(changeEmail);
            Swal.fire({
                icon: 'success',
                title: 'Email has been changed',
              });
        }
    }

    return (
        <>
        <div className="changePassword">
            <form>
                <label>Change Email Address: </label>
                <br></br>
                <input 
                        type="email" 
                        id="eInput" 
                        className="inputboxSettings" 
                        placeholder="Enter Email" 
                        required
                        value= {changeEmail}
                        onChange= {(e) => {setChangeEmail(e.target.value)}} 
                />

                <input 
                        type="email" 
                        id="ceInput" 
                        className="inputboxSettings" 
                        placeholder="Re-enter Email"
                        value= {confirmChangeEmail}
                        onChange= {(e) => {setConfirmChangeEmail(e.target.value)}} 
                />
                 <br></br>   
                 <Link to='/'><button
                        id="siInButton" 
                        className="buttonSettings"
                        onClick= {validateEmail}>
                            Submit
                    </button></Link>
                    
                </form>
            </div>
        </>
    );
};

export default ChangeEmail;