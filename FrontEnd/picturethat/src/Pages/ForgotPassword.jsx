import React from 'react';
import {Link} from 'react-router-dom';
import './Pages.css';
import logo from './logo.png';
import Footer from '../components/footer';

const ForgotPassword  = () => {

    const onSubmitForgot = (e) => {
        e.preventDefault();
    }

    return (
        <>
        <div className= "signInWelcome">
            <form onSubmit = {onSubmitForgot}>
            <img src={logo} alt="" className="logoimg" />
            <div>
                <h1>Forgot Password</h1>
            </div>
                <input type="email" className="inputbox" id="emailInput" placeholder="Email Address" />
                <button id="signInButton" class="signInButton" onclick="submitBtnPress()"><Link to="/SignIn">Submit</Link></button>

                <p className="or"><span>OR</span>
                    <div className="whiteSpace"></div>
                </p>

                <Link to="/SignIn">    
                    <p>Sign In</p>
                </Link>
            </form>
        </div>
        <Footer />
        </>
    );
};

export default ForgotPassword;

//https://www.youtube.com/watch?v=hjR-ZveXBpQ