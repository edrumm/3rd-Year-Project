import React from 'react';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import "../Pages/Settings.css";
import firebase from "../firebase.js";

const ChangePassword = () => {
    const Swal = require('sweetalert2');

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
            isValid = false;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: passwordError.InvalidCharacters,
              });
        }

        if(!(changePassword === confirmChangePassword)){
            passwordError.PasswordMismatch = "Re-entered password MUST be the same as password";
            isValid = false;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: passwordError.PasswordMismatch,
              });
        }
        
        if((checkPassword(changePassword) && checkPassword(confirmChangePassword)) && (changePassword === confirmChangePassword)){
            console.log("Valid password");
            isValid = true;
        }
  
        setPasswordChangeError(passwordChangeError);
        if(isValid===true){
            firebase.changeUserPass(changePassword);
            Swal.fire({
                icon: 'success',
                title: 'Password has been changed',
              });
        }

    }

    return (
        <>
        <div className="changePassword">
            <form>
                <label>Change Password: </label>
                <br></br>
                <input 
                        type="password" 
                        id="passInput" 
                        className="inputboxSettings" 
                        placeholder="Enter Password" 
                        required
                        value= {changePassword}
                        onChange= {(e) => {setChangePassword(e.target.value)}} 
                />

                <input 
                        type="password" 
                        id="CpassInput" 
                        className="inputboxSettings" 
                        placeholder="Re-enter Password"
                        value= {confirmChangePassword}
                        onChange= {(e) => {setConfirmChangePassword(e.target.value)}} 
                />
                <br></br>
                <Link to='/'><button
                        id="sInButton" 
                        className="buttonSettings"
                        onClick= {validatePassword}>
                            Submit
                    </button></Link>
                    <br></br>
                    <Link to="/ForgotPassword">Forgot Password?</Link>
                </form>
            </div>
        </>
    );
};

export default ChangePassword;