import React from 'react';
import olubi from '../components/ImageFiles/File_000.jpeg';
import './ImageFeed.css';
import getData from '../getData';

const ImageFeed = () => {
    const { docs } = getData('posts');
    console.log(docs);

    return (
        <div className= "imageFeed">
        { docs && docs.map(doc => (
        <div key={doc.id}>
            <img src={doc.url} alt="" className="image" />
            <div className="profile">
            <img src={olubi} alt="" className="profileimage" />
            <label className="profileName">{doc.name}</label>
            <label> {doc.Comment} </label>
            
            </div>
            
        </div>
        ))}
        </ div>
    )
}

export default ImageFeed;

//the source bellow was used to help set up how to send and get data from database
//https://www.youtube.com/watch?v=vUe91uOx7R0&ab_channel=TraversyMedia 

//https://www.youtube.com/watch?v=vUe91uOx7R0