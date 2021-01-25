import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import {Link} from 'react-router-dom';
import './profilePage.css';
import logo from './logo.png';

const profilePage  = () => {
    return (
        <>
        <div>
    <Navbar></Navbar>

    
    </div>

    <div class="personalsection">
        <p>Username</p>
        <img src={logo} alt="" className="logoimg" />
    </div>
    </>
    );
};

export default profilePage;