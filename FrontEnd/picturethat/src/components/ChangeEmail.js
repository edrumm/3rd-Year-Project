import React from 'react';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import "../Pages/Settings.css";


const ChangeEmail = () => {

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
            alert(emailError.InvalidCharacters);
        }

        if(!(changeEmail === confirmChangeEmail)){
            emailError.EmailMismatch = "Re-entered email MUST be the same as email";
            alert(emailError.EmailMismatch);
        }
        
        if((checkEmail(changeEmail) && checkEmail(confirmChangeEmail)) && (changeEmail === confirmChangeEmail)){
            console.log("Valid email address");
        }

        setEmailChangeError(emailChangeError);
        console.log(isValid);

    }

    return (
        <>
        <div className="changePassword">
            <form>

                <label>Change Email Address: </label>
                <br></br>

                <input 
                        type="email" 
                        id="passwordInput" 
                        className="inputboxSettings" 
                        placeholder="Enter Email" 
                        required
                        value= {changeEmail}
                        onChange= {(e) => {setChangeEmail(e.target.value)}} 
                />

                <input 
                        type="email" 
                        id="passwordInput" 
                        className="inputboxSettings" 
                        placeholder="Re-enter Email"
                        value= {confirmChangeEmail}
                        onChange= {(e) => {setConfirmChangeEmail(e.target.value)}} 
                />
                 <br></br>   
                    <button
                        id="signInButton" 
                        className="buttonSettings"
                        onClick= {validateEmail}>
                            Submit
                    </button>
                    
                </form>
            </div>
        </>
    );
};

export default ChangeEmail;