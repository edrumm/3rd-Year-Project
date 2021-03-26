import React, { useState } from 'react';
import './Channel.css';
import {Link} from 'react-router-dom';
import firebase from "../firebase.js";


    let setSelectedChannel;

    function Channel() {
        const { docs } = firebase.GetData('channels');
        console.log(docs);
        const currchannel = setSelectedChannel;

        const [follow, setLiked] = useState(false);
        const [button, setButton] = useState("Follow Channel");
    
        const FollowChannel = async (channelId) =>{
            //const follow = firebase.FollowChannel(user, currchannel);
            const following = await firebase.AlreadyFollowed(channelId);
            if(follow === false) {
                setLiked(true);
                setButton("UnFollow Channel")
                if(following === false){
                firebase.FollowChannel(channelId);
                }
              
           } else {
               setLiked(false);
               setButton("Follow Channel")
               if(following === true){
               firebase.UnFollowChannel(channelId);
               }
           }
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
                    <label className="labelHeader">Channel Name: {doc.id}</label>
                    <br/>
                    <br/>
                    <label className="label">No of Followers: {doc.number_of_followers}</label>
                    <label className="label">No of Pictures: {doc.number_of_posts}</label>
                    <br/>
                    <button className="buttonChannel" onClick={() =>FollowChannel(doc.id)} >{button}</button>
                    <Link to="/PictureThat/channelphotospage" ><button className="buttonChannel" onClick={() => {setSelectedChannel = doc.id}} >See Channel</button></Link>
                </div>
                

                
            </div>
            ))}
            </div>
            
            </>
            

        )
    }


export default Channel;
export {setSelectedChannel};