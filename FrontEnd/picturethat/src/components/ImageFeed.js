import React from 'react';
import olubi from '../components/ImageFiles/File_000.jpeg';
import './ImageFeed.css';

const ImageFeed = () => {

    return (
        <div className= "imageFeed">
            <img src={olubi} alt="" className="image" />
        </div>
    )
}

export default ImageFeed;

//https://www.youtube.com/watch?v=vUe91uOx7R0