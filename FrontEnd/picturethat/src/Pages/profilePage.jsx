import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import {Link} from 'react-router-dom';
import './profilePage.css';
import './Pages.css';
import logo from './logo.png';
import ImageGrid from '../components/ImageGrid';
//import 'antd/dist/antd.css';



const profilePage  = () => {
    return (
        <>
        
        <Navbar></Navbar>

        <div class="personalsection">
            <p>Username</p>
            <img src={logo} alt="" className="logoimg" />
            
            <div className="personalInfo">
                <p>Realname</p>
                <p>bio</p>
            </div>

            <div className="followersBox">
                <p>Following</p>
                <p>Followers</p>
            </div>

            <div className="scoresBox">
                <p>No.of Posts</p>
                <p>Total Score</p>
            </div>

            <div className="pageButton1">
                <Link to="/PictureThat/ProfilePage/EditProfile">    
                    <button>
                            Edit Profile
                </button>
                </Link>

                <Link to="/PictureThat/ProfilePage/Achievements">    
                    <button id="achievementsButton">
                            Achievements
                </button>
                </Link>
            </div>
        </div>

        <div className= "imageGrid">

            <div className="imageWrap" id='one'>Picture1</div>
            <div className="imageWrap" id='two'>Picture2</div>
            <div className="imageWrap" id='three'>Picture3</div>

            <div className="imageWrap" id="four">Picture4</div>
            <div className="imageWrap" id="five">Picture5</div>
            <div className="imageWrap" id="six">Picture6</div>
        </div>
    </>
    );
};

export default profilePage;
