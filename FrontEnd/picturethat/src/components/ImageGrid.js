import React from 'react';
import { Link } from 'react-router-dom';
import firebase from "../firebase.js";
import './ImageGrid.css';

const ImageGrid = () => {
    //const user = firebase.getUser().displayName;
    const { docs } = firebase.GetPostofUser();
    console.log(docs);

    return (
        <div className= "imageGrid">
            {docs && docs.map(doc => (
                <div className="imageWrap" key={doc.id}>
                    <img src={doc.url} alt="" onClick={<Link to="/PictureThat/FullPostPage"/>}/>
                </div>
            ))}
        </div>
    )
}

export default ImageGrid;

//https://www.youtube.com/watch?v=vUe91uOx7R0