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

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    // const[emailError, setEmailError] = useState({});
    // const[passwordError, setPasswordError] = useState({});

    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     const isValid = validateForm();
    // }

    const history = useHistory();

    const validateForm = () => {

        let isValid = true;

        try {
          let credentials = {
            email: email,
            password: password
          };

          validate.signin(credentials);
          isValid = true;

        } catch (err) {
          alert(err.message);
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

        /* TO DO : Add functionality for this to take user to the landing page if all clear*/

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
                {/* <form onSubmit = {onSubmit}> */}
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

                {/* <button
                    id="signInButton"
                    className="button">
                    <Link to="/PictureThat">Guest</Link>
                </button> */}

                <Link to="/ForgotPassword">Forgot Password?</Link>
                <Link to="/SignUp"> Sign Up</Link>
                {/* </form> */}
            </div>
        </div>
        <Footer />
        </>
    )


}

export default SignIn;

//https://www.youtube.com/watch?v=hjR-ZveXBpQ
//https://www.youtube.com/watch?v=cFgoSrOui2M
