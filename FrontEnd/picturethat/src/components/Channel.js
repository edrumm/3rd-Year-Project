import React, { useState } from 'react';
import './Channel.css';
import dog from '../components/ImageFiles/jamie-street-uNNCs5kL70Q-unsplash.jpg';



    function Channel() {
       
        return(
            <>
            <div className="Channel">

                <div className="column channelPhoto">
                    <img src={dog} alt="" className="Channelimg"/>
                </div>
                
                <div className="column channelInfo">
                    <label className="label">Channel Name: Dogs</label>
                    <br/>
                    <label className="label">No of Followers: 100 </label>
                    <br/>
                    <label className="label">No of Pictures: 1</label>
                    <br/>
                    <button className="button">See Channel</button>
                </div>

            </div>
            
            </>
            

        )
    }


export default Channel;