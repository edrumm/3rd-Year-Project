import React, { useState } from 'react';
import './ImageFeed.css';
import { Link } from 'react-router-dom';
import firebase from "../firebase.js";
import { setSelectedChannel } from '../components/Channel';
import {motion} from 'framer-motion';

let setSelectedImgId;


const ImageFeed = () => {
    let currentChannel = setSelectedChannel;
    const channelInfo = firebase.GetChannelInfo(currentChannel);
    const { docs } = firebase.GetPostofChannels(currentChannel);
   
    const [follow, setFollow] = useState(false);
    const [fbutton, setFButton] = useState();

    const [loaded, setLoaded] = useState(false);

    const followstate = async () => {
        const alreadyF =  await firebase.AlreadyFollowed(currentChannel);
        if(alreadyF === false){
            setFButton("UnFollow Channel")
       } else {
            setFButton("Follow Channel")
       }
    }
    if(loaded===false){
    followstate();
    setLoaded(true);
    }

    const FollowChannel = async (channel) => {
        const following = await firebase.AlreadyFollowed(channel);

        if (follow === false) {
            setFollow(true);
            setFButton("UnFollow Channel")
            if (following === false) {
                firebase.FollowChannel(channel);
            }
        } else {
            setFollow(false);
            setFButton("Follow Channel")
            if (following === true) {
                firebase.UnFollowChannel(channel);
            }
        }
    };

    return (
        <>
        <div className="backbuttonC">
                <Link to="/PictureThat/ChannelsPage" className="fas fa-arrow-left" />
            </div>
        <motion.div className= "imageFeed" initial={{opacity: 0.2}} animate= {{opacity: 1}} transition={{delay: 0.1}}>
        <div class="card">
                    <div className="channelInfo">
                        <label className="labelHeader">Channel Name: {channelInfo.id}</label>
                        <br />
                        <br />
                        <label className="label">No of Followers: {channelInfo.number_of_followers}</label>
                        <label className="label">No of Pictures: {channelInfo.number_of_posts}</label>
                        <br />
                        <button className="buttonChannel" onClick={() => FollowChannel(currentChannel)} >{fbutton}</button>
                    </div>

                </div>
            { docs && docs.map(doc => (
                <div className="post" key={doc.id}>
                    <div className="postDetailsContainer">
                    <div className="topinfo">
                    <div className="user">  
                            <br></br>
                            <div className="profilecard">                           
                                <label className="profileName">{doc.UserName}</label>
                            <br></br>
                            <label className="location">{doc.location} </label>
                            </div>
                            </div>
                            <br></br>
                           <div className="reportb" onClick={() => {setSelectedImgId = doc.id}}><Link to="/PictureThat/Report">Report</Link></div>
                    </div>
                    </div>

                    <div>
                        <img src={doc.url} alt="" className="image"/>
                    </div>

                    <div className="bottominfo">
                    <div className="postDetailsContainer">

                    <div className="buttonfield">
                        <Link to="/PictureThat/FullPostChannel"><div className="buttonP" onClick={() => {setSelectedImgId = doc.id}}>View Post</div></Link>
                    </div>

                    <div className="">
                        <label className="bottomText">Score: {doc.likes}</label>
                        <br></br>
                        <label className="bottomText">Caption: {doc.caption} </label>
                        <br></br>
                        <label className="bottomText">Channel: {doc.channelName} </label>
                        <br></br>
                        <label className="bottomText">Date: </label>
                    </div>
                </div>
            </div>
        </div>
        ))}
    </motion.div>
    </>
    )
}

export default ImageFeed ;
export {setSelectedImgId};

//the source bellow was used to help set up how to send and get data from database
//https://www.youtube.com/watch?v=vUe91uOx7R0&ab_channel=TraversyMedia
//https://www.youtube.com/watch?v=vUe91uOx7R0