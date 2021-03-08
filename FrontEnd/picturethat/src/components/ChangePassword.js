import React from 'react';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import "../Pages/Settings.css";

const ChangePassword = () => {

    const[changePassword, setChangePassword] = useState('');
    const[confirmChangePassword, setConfirmChangePassword] = useState('');

    const[passwordChangeError, setPasswordChangeError] = useState({});

    //boolean isValid to check if credentials are valid set to true
    var isValid = false;

    const checkPassword = (userPasswordInput) => {
        const passwordRequirements = new RegExp (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/);
        return passwordRequirements.test(userPasswordInput);
    }

    const validatePassword = (e) => {

        //arrays to hold errors set to empty array
        const passwordError = {};

        if(!checkPassword(changePassword)){
            passwordError.InvalidCharacters = "Password MUST contain at least one number/lowercase/uppercase letter and be at least 6 characaters in length";
            alert(passwordError.InvalidCharacters);
        }

        if(!(changePassword === confirmChangePassword)){
            passwordError.PasswordMismatch = "Re-entered password MUST be the same as password";
            alert(passwordError.PasswordMismatch);
        }
        
        if((checkPassword(changePassword) && checkPassword(confirmChangePassword)) && (changePassword === confirmChangePassword)){
            console.log("Valid password");
        }
  

    setPasswordChangeError(passwordChangeError);
    console.log(isValid);

    }

    return (
        <>
        <div className="changePassword">
            <form>

                <label>Change Password: </label>
                <br></br>

                <input 
                        type="password" 
                        id="passwordInput" 
                        className="inputbox" 
                        placeholder="Enter Password" 
                        required
                        value= {changePassword}
                        onChange= {(e) => {setChangePassword(e.target.value)}} 
                />

                <input 
                        type="password" 
                        id="passwordInput" 
                        className="inputbox" 
                        placeholder="Re-enter Password"
                        value= {confirmChangePassword}
                        onChange= {(e) => {setConfirmChangePassword(e.target.value)}} 
                />
                <br></br>
                    <button
                        id="signInButton" 
                        className="button"
                        onClick= {validatePassword}>
                            Submit
                    </button>
                    <br></br>
                    <Link to="/ForgotPassword">Forgot Password?</Link>
                </form>
            </div>
        </>
    );
};

export default ChangePassword;