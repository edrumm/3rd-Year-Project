import React, { useState } from 'react';
import './Channel.css';
import {Link} from 'react-router-dom';
import firebase from "../firebase.js";


    let setSelectedChannel;

    function Channel() {
        const { docs } = firebase.GetData('channels');
        console.log(docs);
        let user = firebase.getUser().displayName;
        const currchannel = setSelectedChannel;

        const [follow, setLiked] = useState(false);
        const [button, setButton] = useState("Follow Channel");
    
        const FollowChannel = (channelId) =>{
            //const follow = firebase.FollowChannel(user, currchannel);
            if(follow === false) {
                setLiked(true);
                setButton("UnFollow Channel")
              
           } else {
               setLiked(false);
               setButton("Follow Channel")
               
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
                    <label className="label">Channel Name: {doc.id}</label>
                    <br/>
                    <label className="label">No of Followers:  </label>
                    <br/>
                    <label className="label">No of Pictures: {doc.number_of_posts}</label>
                    <br/>
                    <Link to="/PictureThat/channelphotospage" ><button className="button" onClick={() => {setSelectedChannel = doc.id}} >See Channel</button></Link>
                    <br/>
                    <button className="button" onClick={() =>FollowChannel(doc.id)} >{button}</button>
                </div>
                

                
            </div>
            ))}
            </div>
            
            </>
            

        )
    }


export default Channel;
export {setSelectedChannel};