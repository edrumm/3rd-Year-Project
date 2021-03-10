import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dog from '../components/ImageFiles/iz-phil-pdALzg0yN-8-unsplash.jpg';
import './FullPost.css';
import firebase from "../firebase.js";
import ImageFeed from "./ImageFeed";
import {setSelectedImgId} from "./ImageFeed";




const FullPost = () => {

    const singlePost = firebase.GetSinglePost(setSelectedImgId);
    console.log(singlePost);

    let currentPost = setSelectedImgId;    
    const[comment, setComment] = useState('');
    // const Imgid = require("./ImageFeed");
    console.log(currentPost);


    const handleUpload = () => {
        firebase.AddComment(comment);
    };

   
    return (
        <>
        <div className="backbutton">
        <Link to="/PictureThat" className="fas fa-arrow-left" />
        </div>
        <div className= "FullPost">
                <div class="card">
                    
                    <div>
                        <img src={singlePost.url} alt="" className="imagestyle"/>
                    </div>
                    
                    <div className="fullpostinfo">
                    

                    <div className="headpart">
                    
                            <img src={dog} alt="" className="profileimg"/>
                            <br></br>
                            <div className="profilecard">
                            <label className="profileN">Username</label>
                            <br></br>
                            <label className="location">{singlePost.location}</label>
                            </div>
                            <br></br>
                            <lable className="report">Report</lable>
                    </div>
                    <div>
                        <div className="imginfo">
                        <label className="caption">{singlePost.caption}</label>
                        <br></br>
                        <label className="channel">{singlePost.channelName}</label>
                        </div>
                        
                        <label className="date">Date</label>
                    </div>  
                        <div className="commentfield">
                            <div className="singlecomment">
                            <div>Username</div>
                            <div>Date</div>
                            <div>Comment</div>
                            </div>
                        </div>

                        <div className="likesection">
                            <div className="like">
                                <a className="far fa-heart" />
                                <label className="score">Score: {singlePost.Likes}</label>
                            </div>
                        </div>

                        <div className="addcomment">
                        <input type="text" className="inputText" placeholder="Add a comment" value= {comment} onChange= {(e) => {setComment(e.target.value)}} />
                        <button onClick={handleUpload} className="postbutton">Post</button>
                        </div>
            </div>
        </div>
        
    </div>
    </>
    )
}

export default FullPost;

