import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import {Link} from 'react-router-dom';
import './profilePage.css';
import './Pages.css';

/* import for image files DEMO */
import dog from '../components/ImageFiles/jamie-street-uNNCs5kL70Q-unsplash.jpg';
import pic1 from '../components/ImageFiles/picture1.jpg';
import pic2 from '../components/ImageFiles/picture2.jpg';
import pic3 from '../components/ImageFiles/picture3.jpg';
import pic4 from '../components/ImageFiles/picture4.jpg';
import pic5 from '../components/ImageFiles/picture5.jpg';
import pic6 from '../components/ImageFiles/picture6.jpg';

//import 'antd/dist/antd.css';

const profilePage  = () => {
    return (
        <>
        
        <Navbar></Navbar>

        <div className="personalsection">

        <div className="column personalsectionLeft">
            <p>Username</p>
            <img src={dog} alt="" className="profileimageProfile" />
            <p>Realname</p>
            <p>bio</p>
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
                    <button>
                            Edit Profile
                    </button>
                </Link>

                <Link to="/PictureThat/ProfilePage/Achievements">    
                    <button>
                            Achievements
                    </button>
                </Link>
            </div>

        </div>

        <p className="spanLine"><span></span></p>

        <div className= "imageGrid">

            <div className="imageWrap"><img src={pic1} alt=""/></div>
            <div className="imageWrap"><img src={pic2} alt=""/></div>
            <div className="imageWrap"><img src={pic3} alt=""/></div>

            <div className="imageWrap"><img src={pic4} alt=""/></div>
            <div className="imageWrap"><img src={pic5} alt=""/></div>
            <div className="imageWrap"><img src={pic6} alt=""/></div>
        </div>
    </>
    );
};

export default profilePage;