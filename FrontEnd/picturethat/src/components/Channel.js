import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Channel.css';
import olubi from '../components/ImageFiles/File_000.jpeg';



    function Channel() {
       
        return(
            <>
            <nav className="Channel">
            <img src={olubi} alt="" className="Channelimg"/>

            <label className="">Channel Name: </label>
            <br/>
            <label className="">No of Followers: </label>
            <br/>
            <label className="">No of Pictures: </label>
            <br/>
            <button className="button">See Channel</button>

            </nav>
            </>
            

        )
    }


export default Channel;