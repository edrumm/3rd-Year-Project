import React from 'react';
import {Link} from 'react-router-dom';
import './Pages.css';
import logo from './logo.png';
import {useState} from 'react';

const SignIn  = () => {


    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const[emailError, setEmailError] = useState({});
    const[passwordError, setPasswordError] = useState({});

    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
    }

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


        if (!checkEmail(email)) {
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
        }

        const data = {
            email: email,
            password: password
          };
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };
        
          fetch('/api/login', options)
          .then(response => response.json())
          .then(json => console.log(json))
          .catch(err => console.error(err));

        setEmailError(emailError);
        setPasswordError(passwordError);

        return isValid;
    }

    const handleLogin = () => {
        <Link to="/PictureThat">Sign In</Link>
    }
    return (
            
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

<Link to="/PictureThat"><button
                    id="signInButton"
                    className="button"
                    type= "submit"
                    onClick= {handleLogin}>
                    Sign In
                </button></Link>

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
    )


}

export default SignIn;

//https://www.youtube.com/watch?v=hjR-ZveXBpQ
//https://www.youtube.com/watch?v=cFgoSrOui2M
