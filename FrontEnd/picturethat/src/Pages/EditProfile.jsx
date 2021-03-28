import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import {Link} from 'react-router-dom';
//import 'antd/dist/antd.css';
import { useState } from 'react';
import './editProfilePage.css';
import './Pages.css';
import firebase from "../firebase.js";

//imports for the dropdown menu
// import { makeStyles } from '@material-ui/core/styles';

//import for the photo camera icon


// const useStyles = makeStyles((theme) => ({
//     root: {
//       display: 'flex',
//     },
//     paper: {
//       marginRight: theme.spacing(2),
//     },
//   }));

 const EditProfile  = () => {


    const [username, setUsername] = useState('');
    const UpdateData = () => {
        firebase.changeUserName(username);
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