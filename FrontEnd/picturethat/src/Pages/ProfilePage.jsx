import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import {Link} from 'react-router-dom';
import './profilePage.css';
import './Pages.css';
import ImageGrid from '../components/ImageGrid';
import Footer from '../components/footer';
import firebase from '../firebase';



const ProfilePage  = () => {

    const dataDoc = firebase.getUser().displayName;
    const userstats = firebase.GetUserStats();
    return (
        <>
        <Navbar></Navbar>
        <div className="personalsection">
        <div className="column personalsectionLeft">
              <div className="circle"><strong>{dataDoc}</strong></div>
        </div>

        <div class="column personalsectionRight">
            
            <div className="column1 leftPersonalSide">
                <div className="content">No. of Posts: {userstats.num_posts}</div>
                <div className="content">User Total Score: {userstats.score}</div>
            </div>

            <div className= "column1 rightPersonalSide">
                <Link to="/PictureThat/ProfilePage/EditProfile">    
                    <button className= "buttonChannel">
                            Edit Profile
                    </button>
                </Link>
                
                <Link to="/PictureThat/ProfilePage/Achievements">    
                    <button className= "buttonChannel">
                            Achievements
                    </button>
                </Link>
            </div>
            </div>
        </div>
        <p className="spanLine"><span></span></p>
        <ImageGrid/>
        <Footer/>
    </>
    );
};

export default ProfilePage;
