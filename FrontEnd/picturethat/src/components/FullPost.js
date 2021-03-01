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
                    

                    <div className="">
                    
                            <img src={dog} alt="" className="profileimg"/>
                            <br></br>
                            <label className="profileN">Username</label>
                    </div>
                            <br></br>
                            <label>Location: </label>
                            <br></br>
                            <div>Report</div>

        
                        <label className="">Score:</label>
                        <br></br>
                        <label>Caption: </label>
                        <br></br>
                        <label>Channel: </label>
                        <br></br>
                        <label>Date</label>
                        <br></br>
                        <input type="text" className="inputText" placeholder="Add a comment"></input>
                
            </div>
        </div>
        
    </div>
    )
}

export default FullPost;

