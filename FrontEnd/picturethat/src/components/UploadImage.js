import React, { useState } from "react";
//import { render } from "react-dom";
import { Link } from "react-router-dom";
import firebase from "../firebase.js";
import './UploadImage.css';
//import { Button } from '@material-ui/core';
//import upload from "../storage";

const ImageUpload = () => {

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [error, setError] = useState(null);
    const[title, setTitle] = useState('');
    const[channel, setDescription] = useState('');
    const[loc, setLoc] = useState('');
    const[localimg, setLocalimg] = useState(null);

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
        firebase.UploadPost(title, loc, channel, image);
        
    };

    console.log("image: ", image);

    return (
        <>
        <div className="container">
        <img src={localimg || "https://via.placeholder.com/400x380.png?text=Upload+Image"} alt="" className="images" />
        { error && <div className="error">{error}</div>}
        <div className="button-wrapper">
        <button className="button width">Add Photo</button>
        <input type="file" onChange={imgChange} />
        </div>
        <div>
        <a className="text" >Details</a>
        <input type="text" className="inputboxT" placeholder="Title" value= {title} onChange= {(e) => {setTitle(e.target.value)}}/>
        <input type="text" className="inputboxT" placeholder="Location" value= {loc} onChange= {(e) => {setLoc(e.target.value)}}/>
        <input type="text" className="inputboxT" placeholder="Channel" value= {channel} onChange= {(e) => {setDescription(e.target.value)}}/>
       
        <Link to="/PictureThat" onClick={handleUpload}><button className="button">Post</button></Link>
        </div>
        </div>
        </>
    );
};

//render(<ImageUpload />, document.querySelector("#root"));

export default ImageUpload;


//https://www.youtube.com/watch?v=8r1Pb6Ja90o

































