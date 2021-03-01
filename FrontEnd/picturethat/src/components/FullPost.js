import React, { useState } from 'react';
import dog from '../components/ImageFiles/iz-phil-pdALzg0yN-8-unsplash.jpg';
import './FullPost.css';



const FullPost = () => {
   
    return (
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
                            <div>Report</div>
                    </div>
                            
                        <label>Location: </label>
                        <br></br>
                        <label>Caption: </label>
                        <br></br>
                        <label>Channel: </label>
                        
                        <div className="likesection">
                            <div className="like">
                                <button className="postbutton">Like</button>
                                <label className="">Score:</label>
                            </div>
                                <label>Date</label>
                        </div>

                        <div className="addcomment">
                        <input type="text" className="inputText" placeholder="Add a comment"></input>
                        <button className="postbutton">Post</button>
                        </div>
            </div>
        </div>
        
    </div>
    )
}

export default FullPost;

