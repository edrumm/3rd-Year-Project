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
        </div>

        <Link to="/PictureThat/EditProfile">    
            <button>
                    Edit Profile
           </button>
        </Link>

        <div className= "imageGrid">

            <div className="imageWrap" id='one'>Picture1</div>
            <div className="imageWrap" id='two'>Picture2</div>
            <div className="imageWrap" id='three'>Picture3</div>

            <div className="imageWrap">Picture4</div>
            <div className="imageWrap">Picture5</div>
            <div className="imageWrap">Picture6</div>
        </div>
    </>
    );
};

export default profilePage;
