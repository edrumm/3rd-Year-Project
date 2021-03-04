import React, { useState } from 'react';
import './Channel.css';
import cat from '../components/ImageFiles/iz-phil-pdALzg0yN-8-unsplash.jpg';
import {Link} from 'react-router-dom';




    function Channel() {
       
        return(
            <>
            <div className="Channel">
            <div class="card">

                
                <div className="column channelPhoto">
                    <img src={cat} alt="" className="Channelimg"/>
                </div>
                
                <div className="column channelInfo">
                    <label className="label">Channel Name: Cats</label>
                    <br/>
                    <label className="label">No of Followers: 100 </label>
                    <br/>
                    <label className="label">No of Pictures: 1</label>
                    <br/>
                    <Link to="/PictureThat/channelphotospage" ><button className="button">See Channel</button></Link>
                </div>
                

                
            </div>
            </div>
            
            </>
            

        )
    }


export default Channel;