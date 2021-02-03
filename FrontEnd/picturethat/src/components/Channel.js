import React, { useState } from 'react';
import './Channel.css';
import cat from '../components/ImageFiles/iz-phil-pdALzg0yN-8-unsplash.jpg';




    function Channel() {
        // const { docs } = getImg('channels');
        // console.log(docs);

        return(
            <>
            <div className="Channel">


                <div className="card">
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
                    <button className="button">See Channel</button>
                </div>
                </div>

                

            </div>
            
            </>
            

        )
    }


export default Channel;