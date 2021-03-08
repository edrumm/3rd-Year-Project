import React from 'react';
import firebase from "../firebase.js";
import './ImageGrid.css';

const ImageGrid = () => {

    const docs = firebase.GetImg("posts");
    console.log(docs);

    return (
        <div className= "imageGrid">
            {docs && docs.map(doc => (
                <div className="imageWrap" key={doc.id}>
                    <img src={doc.url} alt=""/>
                </div>
            ))}
        </div>
    )
}

export default ImageGrid;

//https://www.youtube.com/watch?v=vUe91uOx7R0