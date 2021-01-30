import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Channel.css';
import olubi from '../components/ImageFiles/File_000.jpeg';



    function Channel() {
       
        return(
            <>
            <div className="Channel">
            <div>
            <img src={olubi} alt="" className="Channelimg"/>
            </div>
            <label className="">Channel Name: </label>
            <br/>
            <label className="">No of Followers: </label>
            <br/>
            <label className="">No of Pictures: </label>
            <br/>
            <button className="button">See Channel</button>

            </div>
            </>
            

        )
    }


export default Channel;