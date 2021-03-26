import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Report.css';
import firebase from "../firebase.js";
//import ImageFeed from "./ImageFeed";
import {setSelectedImgId} from "./ImageFeed";






const FullPost = () => {
    const selectedImg = setSelectedImgId;
    const singlePost = firebase.GetSinglePost(selectedImg);
  

    const handleUpload = () => {
        
    };

   

   

    return (
        <>
        <div className="backbutton">
        <Link to="/PictureThat" className="fas fa-arrow-left" />
        </div>
        <div className= "FullPostR">
                <div class="cardR">
                    
                    <div>
                        <img src={singlePost.url} alt="" className="imagestyleR"/>
                    </div>
                    
                    <div className="fullpostinfoR">
                    <div>Reporting a post</div>
                      
                       

                        

                        
                        <input type="text" className="inputText" placeholder="Add a comment" />
                        <button className="Rbutton">Report</button>
                </div>
        </div>
        
    </div>
    </>
    )
}

export default FullPost;