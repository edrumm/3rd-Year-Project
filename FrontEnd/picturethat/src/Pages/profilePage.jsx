import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import {Link} from 'react-router-dom';
import './profilePage.css';
import logo from './logo.png';
import ImageGrid from '../components/ImageGrid';
import 'antd/dist/antd.css';

const profilePage  = () => {
    return (
        <>
        <div>
        <Navbar></Navbar>
        <ImageGrid></ImageGrid>

    
        <p>Profile Page</p>

        <Link to="/PictureThat/EditProfile">    
            <button 
                id="signInButton" 
                className="signInButton">
                    Edit Profile
            </button>
        </Link>
    </div>

    <div class="personalsection">
        <p>Username</p>
        <img src={logo} alt="" className="logoimg" />
    </div>
    </>
    );
};

export default profilePage;
