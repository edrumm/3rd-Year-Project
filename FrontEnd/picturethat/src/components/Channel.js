import React, { useState } from 'react';
import './Channel.css';
import dog from '../components/ImageFiles/jamie-street-uNNCs5kL70Q-unsplash.jpg';
import cat from '../components/ImageFiles/iz-phil-pdALzg0yN-8-unsplash.jpg';
import nature from '../components/ImageFiles/daniel-diesenreither-UIGiXbfQyIg-unsplash.jpg';
import bird from '../components/ImageFiles/bechir-kaddech-6RgFFPEHbLY-unsplash.jpg';



    function Channel() {
       
        return(
            <>
            <div className="Channel">

                <div>
                <div className="column channelPhoto">
                    <img src={dog} alt="" className="Channelimg"/>
                </div>
                
                <div className="column channelInfo">
                    <label className="label">Channel Name: Dogs</label>
                    <br/>
                    <label className="label">No of Followers: 1000 </label>
                    <br/>
                    <label className="label">No of Pictures: 20</label>
                    <br/>
                    <button className="button">See Channel</button>
                </div>
                </div>

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

                <div>
                <div className="column channelPhoto">
                    <img src={nature} alt="" className="Channelimg"/>
                </div>
                
                <div className="column channelInfo">
                    <label className="label">Channel Name: Nature</label>
                    <br/>
                    <label className="label">No of Followers: 9500 </label>
                    <br/>
                    <label className="label">No of Pictures: 500</label>
                    <br/>
                    <button className="button">See Channel</button>
                </div>
                </div>

                <div className="card">
                <div className="column channelPhoto">
                    <img src={bird} alt="" className="Channelimg"/>
                </div>
                
                <div className="column channelInfo">
                    <label className="label">Channel Name: Birds</label>
                    <br/>
                    <label className="label">No of Followers: 500 </label>
                    <br/>
                    <label className="label">No of Pictures: 25</label>
                    <br/>
                    <button className="button">See Channel</button>
                </div>
                </div>
                

            </div>
            
            </>
            

        )
    }


export default Channel;