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

    const history = useHistory();

    const validateForm = (e) => {

        let isValid = true;

        // use joi validation
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
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          });

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
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: err
                });

                history.push('/');
              });

            })
            .catch(err => {
              // unsucessful
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Signup error: ${err}`
              });

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

                    <label className="termsAndConditions"> By signing up, you agree to our <br></br> <Link to="/PictureThat/TermsAndConditions">Terms of Services and Privacy Policy</Link></label><br></br>

                        <button
                            id="signInButton"
                            onClick= {validateForm}
                            className="buttonsu">Sign Up
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
