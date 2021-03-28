import React, { useState } from 'react';
import './ImageFeed.css';
import {Link} from 'react-router-dom';
import firebase from "../firebase";

let setSelectedImgId;

const ImageFeed = () => {
    
    const [liked, setLiked] = useState(false);
    const [button, setButton] = useState("far fa-heart");
    
    const likepost = async (postref) => {
        const alreadyLiked =  await firebase.AlreadyLiked(postref);

        if(liked === false) {
            setLiked(true);
            setButton("fas fa-heart")
           
            console.log(alreadyLiked);
            if(alreadyLiked == false){
                firebase.LikePost(postref);
           }
       } else {
           setLiked(false);
           setButton("far fa-heart")
           if(alreadyLiked == true){
               firebase.UnlikePost(postref);
          }
       }
    };
    const { docs } = firebase.GetTopPosts('posts');
  
    return (
        <>
        <div className= "imageFeed">
            <div className="Title">Top 10 posts</div>
            { docs && docs.map(doc => (
                <div class="post" key={doc.id}>
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
                            <label className="reportb">Report</label>

                    </div>
                    </div>

                    <div>
                        <img src={doc.url} alt="" className="image"/>
                    </div>

                    <div className="bottominfo">
                    <div className="postDetailsContainer">
                    <div className="buttonfield">
                    <a onClick={() =>likepost(doc.id)} className={button} />
                    <Link to="/PictureThat/TopFullPost"><a className="far fa-comment" onClick={() => {setSelectedImgId = doc.id}}/></Link>
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
    </div>
    </>
    )
}

export default ImageFeed ;
export {setSelectedImgId};

//the source bellow was used to help set up how to send and get data from database
//https://www.youtube.com/watch?v=vUe91uOx7R0&ab_channel=TraversyMedia
//https://www.youtube.com/watch?v=vUe91uOx7R0