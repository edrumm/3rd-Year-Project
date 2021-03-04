import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dog from '../components/ImageFiles/iz-phil-pdALzg0yN-8-unsplash.jpg';
import './FullPost.css';



const FullPost = () => {
   
    return (
        <>
        <div className="backbutton">
        <Link to="/PictureThat" className="fas fa-arrow-left" />
        </div>
        <div className= "FullPost">
                <div class="card">
                    
                    <div>
                        <img src={dog} alt="" className="imagestyle"/>
                    </div>
                    
                    <div className="fullpostinfo">
                    

                    <div className="headpart">
                    
                            <img src={dog} alt="" className="profileimg"/>
                            <br></br>
                            <label className="profileN">Username</label>
                            <br></br>
                            <lable className="report">Report</lable>
                    </div>
                        <label>Location: </label>
                        <br></br>
                        <label>Caption: </label>
                        <br></br>
                        <label>Channel: </label>
                        <br></br>
                        <label>Date</label>
                        
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
                                <label className="score">Score:</label>
                            </div>
                        </div>

                        <div className="addcomment">
                        <input type="text" className="inputText" placeholder="Add a comment"></input>
                        <button className="postbutton">Post</button>
                        </div>
            </div>
        </div>
        
    </div>
    </>
    )
}

export default FullPost;

