import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Channel.css';
import olubi from '../components/ImageFiles/File_000.jpeg';



    function Channel() {
       
        return(
            <>
            <div className="Channel">

                <div className="column channelPhoto">
                    <img src={olubi} alt="" className="Channelimg"/>
                </div>
                
                <div className="column channelInfo">
                    <label className="label">Channel Name: </label>
                    <br/>
                    <label className="label">No of Followers: </label>
                    <br/>
                    <label className="label">No of Pictures: </label>
                    <br/>
                    <button className="button">See Channel</button>
                </div>

            </div>
            
            </>
            

        )
    }


export default Channel;