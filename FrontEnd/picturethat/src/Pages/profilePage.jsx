import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import {Link} from 'react-router-dom';
import './profilePage.css';
import './Pages.css';
import {useState} from 'react';

/* import for image files DEMO */
import dog from '../components/ImageFiles/iz-phil-pdALzg0yN-8-unsplash.jpg';
import pic1 from '../components/ImageFiles/picture1.jpg';
import pic2 from '../components/ImageFiles/picture2.jpg';
import pic3 from '../components/ImageFiles/picture3.jpg';
import pic4 from '../components/ImageFiles/picture4.jpg';
import pic5 from '../components/ImageFiles/picture5.jpg';
import pic6 from '../components/ImageFiles/picture6.jpg';
import Footer from '../components/footer';

import firebase from '../firebase';


const ProfilePage  = () => {

    const[text, setText] = useState('Bio');
    const[isEdit, setIsEdit] = useState(false);

    const changeToEditMode = () =>{
        setIsEdit(true);
    }

    const updateEditText = () => {
        setIsEdit(false);
    }

    const renderEdit = () => {
        return(
            <div>
                <input type="text" className="editBio" defaultValue={text} onChange= {(e) => {setText(e.target.value)}} />
                <button onClick={updateEditText}>OK</button>
            </div>
        );
    }

    const renderDefault = () => {
        return (
            <p onDoubleClick={changeToEditMode}>{text}</p>
        );
    }

    const { dataDocs } = firebase.GetData('users');
    console.log(dataDocs);

    return (
        <>

        <Navbar></Navbar>

        <div className="personalsection">

        <div className="column personalsectionLeft">
            {dataDocs && dataDocs.map(dataDocs => (
                <p>{dataDocs.username}</p>
            ))}
            
            <img src={dog} alt="" className="profileimageProfile" />
            <p>Realname</p>

            {isEdit ? renderEdit() : renderDefault()}
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

            <div className="imageWrap"><Link to="/PictureThat/FullPostPage"><img src={pic1} alt="" /></Link></div>
            <div className="imageWrap"><img src={pic2} alt=""/></div>
            <div className="imageWrap"><img src={pic3} alt=""/></div>

            <div className="imageWrap"><img src={pic4} alt=""/></div>
            <div className="imageWrap"><img src={pic5} alt=""/></div>
            <div className="imageWrap"><img src={pic6} alt=""/></div>
        </div>

        <Footer/>
    </>
    );
};

export default ProfilePage;