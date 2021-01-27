import React, { useState } from "react";
import { render } from "react-dom";
import { storage } from "../firebase";
import './UploadImage.css';

const ImageUpload = () => {

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");

    const handleChange = e => {
        if (e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => { 
                        console.log(url);
                        setUrl(url); 
                    });
            }     
            
        );
    };

    console.log("image: ", image);

    return (
        <>
        <div className="container">
        <img src={url || "https://via.placeholder.com/400x380.png?text=Upload+Image"} alt="" className="images" />
        <input accept="image/jpeg,image/png" type="file" onChange={handleChange} />
        <div>
        <lable className="text" >Details</lable>
        <input type="text" className="inputboxT" placeholder="Title" />
        <input type="text" className="inputboxD" placeholder="Description" />
        <button onClick={handleUpload} className="button">Upload</button>
        </div>
        </div>
        </>
    );
};

render(<ImageUpload />, document.querySelector("#root"));

export default ImageUpload;


//https://www.youtube.com/watch?v=8r1Pb6Ja90o

































