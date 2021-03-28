import React, { useState } from 'react';
import './ImageFeed.css';
//import getImg from '../getImg';
import { Link } from 'react-router-dom';
import firebase from "../firebase.js";
//import PopUp from '../components/PostPopUp';
import { setSelectedChannel } from '../components/Channel';

let sSelectedImgId;


const ImageFeed = () => {
    let currentChannel = setSelectedChannel;
    const channelInfo = firebase.GetSingleChannel(currentChannel);
    const { docs } = firebase.GetPostofChannels(currentChannel);
    //console.log(docs);
    const [liked, setLiked] = useState(false);
    const [button, setButton] = useState("far fa-heart");

    const likepost = (postref) => {
        //    const postreference = postref;
        //    console.log(postreference);
        //     if(liked === false) {
        //         setLiked(true);
        //         setButton("fas fa-heart")
        //         const alreadyLiked = firebase.AlreadyLiked(user);
        //         if(!alreadyLiked){
        //             firebase.LikePost(user);
        //         }
        //    } else {
        //        setLiked(false);
        //        setButton("far fa-heart")
        //        const alreadyLiked = firebase.AlreadyLiked(user);
        //        if(alreadyLiked){
        //            firebase.UnlikePost(user);
        //        }
        //    }
        //console.log(postreference);
        if (liked === false) {
            setLiked(true);
            setButton("fas fa-heart")
            //let alreadyLiked = firebase.AlreadyLiked(postref, user);
            //console.log(alreadyLiked);
            //if(alreadyLiked == false){
            console.log("not liked, lets add!")
            firebase.LikePost(postref);
            // }
        } else {
            setLiked(false);
            setButton("far fa-heart")
            //let alreadyLiked = firebase.AlreadyLiked(postref, user);
            // if(alreadyLiked){
            firebase.UnlikePost(postref);
            //}
        }
    };

    const [follow, setFollow] = useState(false);
    const [fbutton, setFButton] = useState("Follow Channel");

    const FollowChannel = async (channel) => {
        //const follow = firebase.FollowChannel(user, currchannel);
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
    }
    //console.log(currentChannel);


    // const setSelectedImgId = (id) => {
    //     imgId = id;
    //     console.log(imgId);
    // }


    //return selectedImgId;

    // const [showPopUp, setShowPopUp] = useState(false);

    // const openPopUp = () => {
    //     setShowPopUp(prev => !prev)
    // };

    return (
        <>
            <div className="backbuttonC">
                <Link to="/PictureThat/ChannelsPage" className="fas fa-arrow-left" />
            </div>

            <div className="imageFeed">
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
                <div className="whitespace" />
                {docs && docs.map(doc => (
                    <div class="post" key={doc.id}>
                        <div className="postDetailsContainer">
                            <div className="topinfo">
                                <div className="user">
                                    <br></br>
                                    <div className="profilecard">
                                        <label className="profileN">{doc.UserName}</label>
                                        <br></br>
                                        <label className="location">{doc.location} </label>
                                    </div>
                                </div>
                                <br></br>
                                <Link to="/PictureThat/ReportC"><div className="reportb" onClick={() => { sSelectedImgId = doc.id }}>Report</div></Link>

                            </div>
                        </div>

                        <div>
                            <img src={doc.url} alt="" className="image" />
                        </div>

                        <div className="bottominfo">
                            <div className="postDetailsContainer">
                                <div className="buttonfield">
                                    <a onClick={() => likepost(doc.id)} className={button} />
                                    <Link to="/PictureThat/FullPostChannel"><a className="far fa-comment" onClick={() => { sSelectedImgId = doc.id }} /></Link>
                                </div>
                                <div className="">
                                    <label className="">Score: {doc.likes}</label>
                                    <br></br>
                                    <label>Caption: {doc.caption} </label>
                                    <br></br>
                                    <label>Channel: {doc.channelName} </label>
                                    <br></br>
                                    <label>{new Date(doc.uploaddate.seconds * 1000).toLocaleDateString()}</label>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ImageFeed;
export { sSelectedImgId };



//the source bellow was used to help set up how to send and get data from database
//https://www.youtube.com/watch?v=vUe91uOx7R0&ab_channel=TraversyMedia 
//https://www.youtube.com/watch?v=vUe91uOx7R0

//<input type="text" className="commentinput" placeholder="Add a comment"></input>
//<button onClick={openPopUp}>Show Modal</button>
//<PopUp showPopUp={showPopUp} setShowPopUp={setShowPopUp} />