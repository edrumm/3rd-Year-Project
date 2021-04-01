import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FullPost.css';
import firebase from "../firebase.js";
import {sSelectedImgId} from "./ChannelPhotos";





const FullPost = () => {
    const selectedImg = sSelectedImgId;
    const singlePost = firebase.GetSinglePost(selectedImg);
    const getcomments = firebase.GetComments(selectedImg);
    const postsLikes = firebase.GetLikes(selectedImg);

    let currentPost = sSelectedImgId;    
    const[comment, setComment] = useState('');
    const [cbutton, setcButton] = useState();
    const [cloaded, setLoaded] = useState(false);

    const likedstate = async () => {
        const calreadyLiked =  await firebase.AlreadyLiked(currentPost);
        if(calreadyLiked === false){
            setcButton("far fa-heart")
       } else {
            setcButton("fas fa-heart")
       }
    }
    if(cloaded===false){
    likedstate();
    setLoaded(true);
    }

    const handleUpload = () => {
        firebase.AddComment(comment, currentPost);
        setComment("");
    };

    const [liked, setcLiked] = useState(false);

    const likepost = async (postref) => {
        const calreadyLiked =  await firebase.AlreadyLiked(postref);

        if(liked === false) {
            setcLiked(true);
            setcButton("fas fa-heart")
        
            if(calreadyLiked === false){
                firebase.LikePost(postref);
           }
       } else {
           setcLiked(false);
           setcButton("far fa-heart")
           if(calreadyLiked === true){
               firebase.UnlikePost(postref);
          }
       }
    };

    return (
        <>
        <div className="backbutton">
        <Link to="/PictureThat/channelphotospage" className="fas fa-arrow-left" />
        </div>
        <div className= "FullPost">
                <div class="card">
                    <div>
                        <img src={singlePost.url} alt="" className="imagestyle"/>
                    </div>
                    <div className="fullpostinfo">
                        <div className="headpart">
                            <div className="profilecard">
                                <label className="profileN">{singlePost.UserName}</label>
                                <br></br>
                                <label className="location">{singlePost.location}</label>
                                </div>
                                <br></br>
                                <Link to="/PictureThat/ReportC"><div className="reportb">Report</div></Link>
                            </div>
                        <div>
                            <div className="imginfo">
                                <label className="caption">{singlePost.caption}</label>
                                <br></br>
                                <label className="channel">Channel: {singlePost.channelName}</label>
                                <br></br>
                                <br></br>
                            </div>
                        </div>  
                        <div className="commentfield">
                            { getcomments && getcomments.map(doc => (
                                <div className="singlecomment" key={doc.id}>
                                    <label className="commentFormat">{doc.username}: </label>
                                    <label className="commentFormat">{doc.text}</label>
                                    <br></br>
                                    <label className="commentFormat">{new Date(doc.uploaddate.seconds * 1000).toLocaleDateString()}</label>   
                        </div>
                        ))}
                        </div>

                        <div className="likesection">
                            <div className="like">
                            <div onClick={() =>likepost(singlePost.id)} className={cbutton} />
                                <label className="score">Score: {postsLikes.likes}</label>
                            </div>
                        </div>

                        <div className="addcomment">
                        <input type="text" className="inputText" placeholder="Add a comment" value= {comment} onChange= {(e) => {setComment(e.target.value)}} />
                        <button onClick={handleUpload} className="postbutton">Post</button>
                        </div>
                </div>
        </div>
    </div>
    </>
    )
}

export default FullPost;