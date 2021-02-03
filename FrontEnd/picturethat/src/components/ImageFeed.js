import React from 'react';
import dog from '../components/ImageFiles/iz-phil-pdALzg0yN-8-unsplash.jpg';
import './ImageFeed.css';
import getImg from '../getImg';

const ImageFeed = () => {
    const { docs } = getImg('posts');
    console.log(docs);

    return (
        <div className= "imageFeed">
            { docs && docs.map(doc => (
                <div class="post" key={doc.id}>
                    <div>
                        <img src={doc.url} alt="" className="image"/>
                    </div>
            
                    <div className="info">

                    <div className="postDetailsContainer">
                        <div className=" column user">
                            <img src={dog} alt="" className="profileimage"/>
                            <br></br>
                            <label className="profileName">Username</label>
                        </div>

                    <div className=" column postDetails">
                        <label>Caption: {doc.title} </label>
                        <br></br>
                        <label>Location: {doc.loc} </label>
                        <br></br>
                        <label>Channel: {doc.description} </label>
                        <br></br>
                        <label className="">Score:</label>
                    </div>
                </div>
            </div>
        </div>
        ))}
    </div>
    )
}

export default ImageFeed;

//the source bellow was used to help set up how to send and get data from database
//https://www.youtube.com/watch?v=vUe91uOx7R0&ab_channel=TraversyMedia 
//https://www.youtube.com/watch?v=vUe91uOx7R0