import React from 'react';
import './Pages.css';
import logo from './logo.png';
import Footer from '../components/footer';

const ContactPage  = () => {

   

    return (
        <>
        <div className= "signInWelcome">
            
            <img src={logo} alt="" className="logoimg" />
            <div>
                <h3>Contact Information</h3>
            </div>
                
        </div>
        <Footer />
        </>
    );
};

export default ContactPage;
