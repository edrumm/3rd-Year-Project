import React from 'react';
import {Link} from 'react-router-dom';
import './Pages.css';
import logo from './logo.png';
import {useState} from 'react';
import Footer from '../components/footer';
import {useHistory} from 'react-router-dom';

const SignUp  = () => {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmEmail, setConfirmEmail] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');

    const[emailError, setEmailError] = useState({});
    const[passwordError, setPasswordError] = useState({});

    //boolean isValid to check if credentials are valid set to true
    var isValid = false;

    const history = useHistory();

    const checkEmail = (userEmailInput) => {

        //link for the regex used
        //https://sigparser.com/developers/email-parsing/regex-validate-email-address/

        const emailRequirements = new RegExp (/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
        return emailRequirements.test(userEmailInput);
    }

    const checkPassword = (userPasswordInput) => {
        const passwordRequirements = new RegExp (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/);
        return passwordRequirements.test(userPasswordInput);
    }
    const validateForm = (e) => {

        //arrays to hold errors set to empty array
        const emailError = {};
        const passwordError = {};
        
        if (!checkEmail(email)) {
                emailError.InvalidCharacters = "Your Email address is incorrect. Try again.";
                alert(emailError.InvalidCharacters);
        }

        if(!(email === confirmEmail)){
            emailError.EmailMismatch = "Re-entered email MUST be the same as email";
            alert(emailError.EmailMismatch);
        }
        
        if((checkEmail(email) && checkEmail(confirmEmail)) && (email === confirmEmail)){
            console.log("Valid email address");
        }

        if(!checkPassword(password)){
            passwordError.InvalidCharacters = "Password MUST contain at least one number/lowercase/uppercase letter and be at least 6 characaters in length";
            alert(passwordError.InvalidCharacters);
        }

        if(!(password === confirmPassword)){
            passwordError.PasswordMismatch = "Re-entered password MUST be the same as password";
            alert(passwordError.PasswordMismatch);
        }
        
        if((checkPassword(password) && checkPassword(confirmPassword)) && (password === confirmPassword)){
            console.log("Valid password");
        }

        if((checkPassword(password) && checkPassword(confirmPassword)) && (password === confirmPassword) && (checkEmail(email) && checkEmail(confirmEmail)) && (email === confirmEmail)){
            isValid = true;
            console.log(email);
            console.log(password);
        }
        else{
            isValid = false;
        }

        setEmailError(emailError);
        setPasswordError(passwordError);
        console.log(isValid);

        if(isValid === true){
            const data = {
                email: email,
                password: password
              };
              
                //needed for fetch to work, always keep!
                const options = {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
                };
              
                fetch('/api/signup', options)
                .then(response => response.json())
                .then(json => isValid = json.body)
                .catch(err => console.error(err));

            history.push("/PictureThat");

        }
        
        if(isValid === false){
            return isValid;
        }

        
        
    }

    return (
        <>
        <div className= "signup">
            <div>
                <img src={logo} alt="" class="logoimg" />
                <p className="text">Sign up to see photos that are tailored to you!</p>
            </div>

            <div>
                <form>
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
                        id="emailInput" 
                        className="inputbox" 
                        placeholder="Re-enter Email Address"
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
                        id="passwordInput" 
                        className="inputbox" 
                        placeholder="Re-enter Password"
                        value= {confirmPassword}
                        onChange= {(e) => {setConfirmPassword(e.target.value)}} 
                    />

                    <input 
                        type="checkbox" 
                        id="termsAndConditions" 
                        name="termsAndConditions" 
                        value="Accept" 
                    />

                    <label className="termsAndConditions"> I agree to the <Link to="/PictureThat/TermsAndConditions">Terms of Services and Privacy Policy</Link></label><br></br>
                    
                        <button
                            id="signInButton"
                            onClick= {validateForm} 
                            className="button">Sign Up
                        </button>
                
                    <p>Have an Account?</p><Link to="/SignIn">Sign In</Link>
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