import React from 'react';
import {Link} from 'react-router-dom';
import './Pages.css';
import logo from './logo.png';
import {useState} from 'react';
import Footer from '../components/footer';
import {useHistory} from 'react-router-dom';
import {Login} from '../firebase';
import validate from '../validate';

const SignIn  = () => {

  const Swal = require('sweetalert2');

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
  
    const[emailError, setEmailError] = useState({});
    const[passwordError, setPasswordError] = useState({});

    const history = useHistory();

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

    const validateForm = () => {

        let isValid = true;

        const emailError = {};
        const passwordError = {};
         

         if (!checkEmail(email)) {
                 emailError.InvalidCharacters = "Your Email address is incorrect. Try again.";
                 Swal.fire({
                     icon: 'error',
                     title: 'Oops...',
                     text: emailError.InvalidCharacters,
                   });
         }
 
         if(!checkPassword(password)){
             passwordError.InvalidCharacters = "Your Password entered is incorrect. Try again.";
             Swal.fire({
                 icon: 'error',
                 title: 'Oops...',
                 text: passwordError.InvalidCharacters,
               });
         }

         if(checkPassword(password) && checkEmail(email)){
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

        try {
          let credentials = {
            email: email,
            password: password
          };

          validate.signin(credentials);
          isValid = true;

        } catch (err) {
          isValid = false;
        }

        if (isValid) {

            Login(email, password)
            .then(() => {
              history.push("/PictureThat");
            })
            .catch(err => {
              console.error(err);
              history.push('/');
            });

            return true;

        } else {
          history.push('/');
          return false;
        }
    }


    return (
        <>
        <div className= "signInWelcome">
            <div>
                <img src={logo} alt="" className="logoimg" />
                <div className="text" >Hi there! Nice to see you again.</div>
            </div>

            <div className="whiteSpace"></div>

            <div>
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
                    onClick= {() => { validateForm(); }}>
                    Sign In
                </button>

                <div className="whiteSpace"></div>

                <div className="or"><span>OR</span>
                    <div className="whiteSpace"></div>
                </div>
                <Link to="/ForgotPassword">Forgot Password?</Link>
                <Link to="/SignUp"> Sign Up</Link>
            </div>
        </div>
        <Footer />
        </>
    )


}

export default SignIn;

//https://www.youtube.com/watch?v=hjR-ZveXBpQ
//https://www.youtube.com/watch?v=cFgoSrOui2M
