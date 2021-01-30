import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Channel.css';
import olubi from '../components/ImageFiles/File_000.jpeg';



    function Channel() {
       
        return(
            <>
            <nav className="Channel">
            <img src={olubi} alt="" className="Channelimg"/>
            </nav>
            </>
            

        )
    }


export default Channel;