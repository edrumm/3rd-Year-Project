import React, { useState } from "react";
import { render } from "react-dom";
import { storage, firedatabase, timestamp } from "../firebase";
import './UploadImage.css';

const ImageUpload = () => {

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [error, setError] = useState(null);

    const imgTypes = ['image/png', 'image/jpeg'];

    const imgChange = (e) => {
        let selectedImg = e.target.files[0];
        // checks to see if file has been selected and if its the correct type
        if (selectedImg && imgTypes.includes(selectedImg.type)){
            setImage(selectedImg);
            setError('');

        } else {
            setImage(null);
            setError('Incorrect Image type, please select a PNG or JPEG image');
        }
        
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        const collection = firedatabase.collection('posts');
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
                        const imguploaded = timestamp();
                        collection.add({ url: url, imguploaded});
                    });
            }     
            
        );
    };

    console.log("image: ", image);

    return (
        <>
        <div className="container">
        <img src={url || "https://via.placeholder.com/400x380.png?text=Upload+Image"} alt="" className="images" />
        { error && <div className="error">{error}</div>}
        <input type="file" onChange={imgChange} />
        <div>
        <a className="text" >Details</a>
        <input type="text" className="inputboxT" placeholder="Title" />
        <input type="text" className="inputboxD" placeholder="Description" />
        <input type="text" className="inputboxT" placeholder="Channel" />
        <button onClick={handleUpload} className="button">Post</button>
        </div>
        </div>
        </>
    );
};

render(<ImageUpload />, document.querySelector("#root"));

export default ImageUpload;


//https://www.youtube.com/watch?v=8r1Pb6Ja90o

































