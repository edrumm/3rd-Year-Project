import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import {Link} from 'react-router-dom';
import './profilePage.css';
import './Pages.css';
import {useState} from 'react';
import ImageGrid from '../components/ImageGrid';

/* import for image files DEMO */
import dog from '../components/ImageFiles/iz-phil-pdALzg0yN-8-unsplash.jpg';
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

        <ImageGrid/>

        <Footer/>
    </>
    );
};

export default ProfilePage;