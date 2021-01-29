import React, { useState } from "react";
import { render } from "react-dom";
import { storage, firedatabase, timestamp } from "../firebase";
import './UploadImage.css';

const ImageUpload = () => {

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [error, setError] = useState(null);
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
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
                        const uploaddate = timestamp();
                        collection.add({ url: url, uploaddate, title, loc, description});
                    });
            }     
            
        );
    };

    console.log("image: ", image);

    return (
        <>
        <div className="container">
        <img src={localimg || "https://via.placeholder.com/400x380.png?text=Upload+Image"} alt="" className="images" />
        { error && <div className="error">{error}</div>}
        <input type="file" onChange={imgChange} />
        <div>
        <a className="text" >Details</a>
        <input type="text" className="inputboxT" placeholder="Caption" value= {title} onChange= {(e) => {setTitle(e.target.value)}}/>
        <input type="text" className="inputboxT" placeholder="Location" value= {loc} onChange= {(e) => {setLoc(e.target.value)}}/>
        <input type="text" className="inputboxT" placeholder="Channel" value= {description} onChange= {(e) => {setDescription(e.target.value)}}/>
       
        <button onClick={handleUpload} className="button">Post</button>
        </div>
        </div>
        </>
    );
};

render(<ImageUpload />, document.querySelector("#root"));

export default ImageUpload;


//https://www.youtube.com/watch?v=8r1Pb6Ja90o

































