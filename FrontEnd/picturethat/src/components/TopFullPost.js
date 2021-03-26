import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FullPost.css';
import firebase from "../firebase.js";
import {SelectedImgId} from "./TopPosts";






const FullPost = () => {
    const selectedImg = SelectedImgId;
    const singlePost = firebase.GetSinglePost(selectedImg);
    const getcomments = firebase.GetComments(selectedImg);
    //console.log(getcomments);
    //console.log(singlePost);

    let currentPost = SelectedImgId;    
    const[comment, setComment] = useState('');
    // const Imgid = require("./ImageFeed");
    //console.log(currentPost);

    const handleUpload = () => {
        firebase.AddComment(comment, currentPost);
    };

   
    const [liked, setLiked] = useState(false);
    const [button, setButton] = useState("far fa-heart");

    const likepost = () => {
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
            if(liked === false) {
                setLiked(true);
                setButton("fas fa-heart")
               //let alreadyLiked = firebase.AlreadyLiked(postref, user);
                //console.log(alreadyLiked);
                //if(alreadyLiked == false){
                    firebase.LikePost(selectedImg);
              // }
           } else {
               setLiked(false);
               setButton("far fa-heart")
                //let alreadyLiked = firebase.AlreadyLiked(postref, user);
              // if(alreadyLiked){
                   firebase.UnlikePost(selectedImg);
              //}
           }
        };

    return (
        <>
        <div className="backbutton">
        <Link to="/PictureThat/TopPosts" className="fas fa-arrow-left" />
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
                                <div className="reportb"><Link to="/PictureThat/Report">Report</Link></div>
                            </div>
                        <div>
                            <div className="imginfo">
                                <label className="caption">Caption: {singlePost.caption}</label>
                                <br></br>
                                <label className="channel">Channel: {singlePost.channelName}</label>
                                <br></br>
                                <label className="date">Date:</label>
                                <br></br>
                            </div>
                        </div>  
                        <div className="commentfield">
                            { getcomments && getcomments.map(doc => (
                                <div className="singlecomment" key={doc.id}>
                                    <label className="commentFormat">{doc.username}: </label>
                                    <label className="commentFormat">{doc.text}</label>
                                    <br></br>
                                    <label className="commentFormat">Date:</label>   
                        </div>
                        ))}
                        </div>

                        <div className="likesection">
                            <div className="like">
                                <a onClick={() =>likepost()} className={button} />
                                <label className="score">Score: {singlePost.likes}</label>
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