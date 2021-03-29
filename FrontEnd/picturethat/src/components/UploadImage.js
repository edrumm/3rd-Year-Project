import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase.js";
import './UploadImage.css';
import {motion} from 'framer-motion';

const ImageUpload = () => {

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [error, setError] = useState(null);
    const[caption, setTitle] = useState('');
    const[channel, setChannel] = useState('');
    const[loc, setLoc] = useState(null);
    const[localimg, setLocalimg] = useState(null);
    const Swal = require('sweetalert2');

    const imgTypes = ['image/png', 'image/jpeg'];

    const imgChange = (e) => {
        let selectedImg = e.target.files[0];
        // checks to see if file has been selected and if its the correct type
        if (selectedImg && imgTypes.includes(selectedImg.type)){
            let path = URL.createObjectURL(e.target.files[0]);
            setImage(selectedImg);
            setLocalimg(path);
            setError('');

        } else {
            setImage(null);
            setLocalimg(null);
            setError('Incorrect Image type, please select a PNG or JPEG image');
        }
    };

    const handleUpload = () => {
        var location = loc;
        if(loc === null){
            location = "[No location]";
        }
        if(image === null){
            Swal.fire({
                icon: 'error',
                title: 'Post has not been finished',
                text: "Cannot upload a post with no image!"
              });
        } if(channel === null){
            Swal.fire({
                icon: 'error',
                title: 'Post has not been finished',
                text: "You Need to choose a channel for your post!"
              });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Post has been Uploaded!',
                text: ""
              });
        const channelLC = channel.toLowerCase();
        firebase.UploadPost(caption, location, channelLC, image);
        setLocalimg(null);
        setLoc("");
        setTitle("");
        setImage(null);
        setChannel("");
        }
    };

    return (
        <>
        <motion.div className="container" initial={{opacity: 0}} animate= {{opacity: 1}} transition={{delay: 0.1}}>
            <img src={localimg || "https://via.placeholder.com/400x380.png?text=Upload+Image"} alt="" className="imagesDiv" />
            { error && <div className="error">{error}</div>}
            <div className="button-wrapper">
                <button className="buttonUpload width"><input type="file" onChange={imgChange} />Add Photo</button>
            </div>

            <div className="textFields">
                <a className="text" >Details</a>
                <input type="text" className="inputboxT" placeholder="Title" value= {caption} onChange= {(e) => {setTitle(e.target.value)}}/>
                <input type="text" className="inputboxT" placeholder="Location" value= {loc} onChange= {(e) => {setLoc(e.target.value)}}/>
                <input type="text" className="inputboxT" placeholder="Channel" value= {channel} onChange= {(e) => {setChannel(e.target.value)}}/>
                <div>Post must follow the Terms and Conditions,<br/> They must not include people in them</div>
                <button onClick={handleUpload} className="buttonUpload">Post</button>
            </div>
        </motion.div>
        </>
    );
};

export default ImageUpload;
//https://www.youtube.com/watch?v=8r1Pb6Ja90o
