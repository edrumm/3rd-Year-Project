import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import './editProfilePage.css';
import './Pages.css';
import firebase from "../firebase.js";

const EditProfile  = () => {
    const Swal = require('sweetalert2');

    const [username, setUsername] = useState(null);
    const UpdateData = () => {
        if(username === null){
            Swal.fire({
                icon: 'error',
                title: 'Please enter a new username',
              });
        } else {
        firebase.changeUserName(username);
        Swal.fire({
            icon: 'success',
            title: 'Username changed',
          });
        setUsername("");
        }
    }

    return (
        <>
        <Navbar></Navbar>
        <div className="backbutton">
        <Link to='/PictureThat/ProfilePage' className="fas fa-arrow-left" />
        </div>
        <div className="editProfileContainer">
            <h2>Edit Profile</h2>
            <input 
                className="inputboxEditProfile" 
                type="text"
                id= "inputbox"
                placeholder="Edit Username"
                autoFocus
                value= {username}
                onChange= {(e) => {setUsername(e.target.value)}}
            />
                        
            <button 
                    id="signInButton" 
                    className="buttonEditProfile"
                    onClick={UpdateData}
                    >
                        Confirm
                </button>
    </div>
    </>
    );
};

export default EditProfile;

//https://www.youtube.com/watch?v=5AK37Wy5eNs
//https://codesandbox.io/s/reb0z?file=/index.js:172-192
//https://www.youtube.com/watch?v=RmiP1AY5HFM
//https://material-ui.com/components/menus/#simple-menu
//https://material-ui.com/components/menus/#simple-menu