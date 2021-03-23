import React from 'react';
import {Link} from 'react-router-dom';
import './Pages.css';
import logo from './logo.png';
import Footer from '../components/footer';
import {useState} from 'react';
import firebase from '../firebase';

const ForgotPassword  = () => {

    const[email, setEmail] = useState('');
    //console.log(email);

    const onSubmitForgot = () => {
        firebase.forgotPass(email);
    }

    return (
        <>
        <div className= "signInWelcome">
            <form onSubmit = {onSubmitForgot}>
            <img src={logo} alt="" className="logoimg" />
            <div>
                <h3>Forgot Password</h3>
            </div>
                <input 
                    type="email" 
                    className="inputbox" 
                    id="emailInput" 
                    placeholder="Email Address" 
                    value= {email}
                    onChange= {(e) => {setEmail(e.target.value)}}/>
                <button id="signInButton" className="signInButton" onClick={onSubmitForgot}><Link to="/SignIn">Submit</Link></button>

                <div className="or"><span>OR</span>
                    <div className="whiteSpace"></div>
                </div>

                <Link to="/SignIn">    
                    <div>Sign In</div>
                </Link>
            </form>
        </div>
        <Footer />
        </>
    );
};

export default ForgotPassword;

//https://www.youtube.com/watch?v=hjR-ZveXBpQ