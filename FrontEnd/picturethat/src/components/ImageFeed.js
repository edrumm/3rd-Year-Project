import React, { useState, useEffect } from 'react';
import './ImageFeed.css';
import {Link} from 'react-router-dom';
import firebase from "../firebase";
import {motion} from 'framer-motion';

let setSelectedImgId;

const ImageFeed = () => {
    
    const { docs } = firebase.GetImg('posts');

    
    return (
        <>
        <motion.div className= "imageFeed" initial={{opacity: 0.2}} animate= {{opacity: 1}} transition={{delay: 0.1}}>
            { docs && docs.map(doc => (
                <div className="post" key={doc.id}>
                    <div className="postDetailsContainer">
                    <div className="topinfo">
                    <div className="user">  
                            <br></br>
                            <div className="profilecard">                           
                                <label className="profileName">{doc.UserName}</label>
                            <br></br>
                            <label className="location">{doc.location} </label>
                            </div>
                            </div>
                            <br></br>
                            <Link to="/PictureThat/Report"><div className="reportb" onClick={() => { setSelectedImgId = doc.id }}>Report</div></Link>
                    </div>
                    </div>

                    <div>
                        <img src={doc.url} alt="" className="image"/>
                    </div>

                    <div className="bottominfo">
                    <div className="postDetailsContainer">

                    <div className="buttonfield">
                         <Link to="/PictureThat/FullPostPage"><div className="buttonP" onClick={() => {setSelectedImgId = doc.id}}>View Post</div></Link>
                    </div>

                    <div className="">
                        <label className="bottomText">Score: {doc.likes}</label>
                        <br></br>
                        <label className="bottomText">Caption: {doc.caption} </label>
                        <br></br>
                        <label className="bottomText">Channel: {doc.channelName} </label>
                        <br></br>
                        <label className="bottomText">{new Date(doc.uploaddate.seconds * 1000).toLocaleDateString()}</label>
                    </div>
                </div>
            </div>
        </div>
        ))}
        
    </motion.div>
    </>
    )


}

export default ImageFeed;
export { setSelectedImgId };

//the source bellow was used to help set up how to send and get data from database
//https://www.youtube.com/watch?v=vUe91uOx7R0&ab_channel=TraversyMedia
//https://www.youtube.com/watch?v=vUe91uOx7R0