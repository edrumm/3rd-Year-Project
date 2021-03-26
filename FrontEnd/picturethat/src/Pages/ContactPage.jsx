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
            <div>PictureThat has been created by Pronto</div>
            <br />
            <div>Contact Us</div>
            <div>prontoenquiries@gmail.com</div>
            <br />
            <br />
            <div>Address</div>
            <div>Heriot Watt University</div>
            <div>EH14 4AS</div>
                
        </div>
        <Footer />
        </>
    );
};

export default ContactPage;
