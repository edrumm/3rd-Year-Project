import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import {Link} from 'react-router-dom';
import './profilePage.css';
import './Pages.css';
import {useState} from 'react';
import ImageGrid from '../components/ImageGrid';

/* import for image files DEMO */
import Footer from '../components/footer';
import firebase from '../firebase';

const ProfilePage  = () => {


    const dataDoc = firebase.getUser().displayName;
    console.log(dataDoc);

    return (
        <>

        <Navbar></Navbar>

        <div className="personalsection">

        <div className="column personalsectionLeft">
              <div className="circle">{dataDoc}</div>
        </div>

        <div class="column personalsectionRight">
            
            <div className="column1 leftPersonalSide">
                <div className="content">Followers</div>
                <div className="content">No. of Posts</div>
            </div>

            <div className="column1 rightPersonalSide">
                <div className="content">Following</div>
                <div className="content">Total Score</div>
            </div>

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
        <p className="spanLine"><span></span></p>
        <ImageGrid/>

        <Footer/>
    </>
    );
};

export default ProfilePage;
