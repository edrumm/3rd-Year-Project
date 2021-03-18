import React, { useState } from 'react';
import './Channel.css';
import cat from '../components/ImageFiles/iz-phil-pdALzg0yN-8-unsplash.jpg';
import {Link} from 'react-router-dom';
import firebase from "../firebase.js";


    let setSelectedChannel;

    function Channel() {
        const { docs } = firebase.GetData('channels');
        console.log(docs);
        let user = firebase.getUser().displayName;
        const currchannel = setSelectedChannel;

        const channelFollow = () =>{
            const follow = firebase.FollowChannel(user, currchannel);
        }
        return(
            <>
            <div className="Channel">
            { docs && docs.map(doc => (
            <div class="card" key={doc.id}>

                
                {/* <div className="column channelPhoto">
                    <img src={cat} alt="" className="Channelimg"/>
                </div> */}
                
                <div className="channelInfo">
                    <label className="label">Channel Name: {doc.id}</label>
                    <br/>
                    <label className="label">No of Followers:  </label>
                    <br/>
                    <label className="label">No of Pictures: {doc.number_of_posts}</label>
                    <br/>
                    <Link to="/PictureThat/channelphotospage" ><button className="button" onClick={() => {setSelectedChannel = doc.id}} >See Channel</button></Link>
                </div>
                

                
            </div>
            ))}
            </div>
            
            </>
            

        )
    }


export default Channel;
export {setSelectedChannel};