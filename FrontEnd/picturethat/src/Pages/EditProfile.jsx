import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import {Link} from 'react-router-dom';
//import 'antd/dist/antd.css';
import {Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import { useState } from 'react';
import './editProfilePage.css';
import './Pages.css';
import firebase from "../firebase.js";

//imports for the dropdown menu
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

//import for the photo camera icon
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));

 const EditProfile  = () => {

    const inputReference = React.useRef();

    const filePopup = () => inputReference.current.click();
    
     
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const [username, setUsername] = useState('');
    console.log(username);
    const UpdateData = () => {
        console.log(username);
        firebase.changeUserName(username);
    }

    


    return (
        <>
        <Navbar></Navbar>
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

            <input
                className="inputboxEditProfile" 
                type="text"
                id= "inputbox"
                placeholder="Edit Realname"
                autoFocus
            />

            <input
                className="inputboxEditProfile" 
                type="text"
                id= "inputbox"
                placeholder="Edit Bio"
                autoFocus
            />

            <Link to="/PictureThat/profilePage">    
                <button 
                    id="signInButton" 
                    className="buttonEditProfile"
                    onClick={UpdateData}
                    >
                        Confirm
                </button>
            </Link>
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