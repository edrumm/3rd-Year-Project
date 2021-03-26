import React, { useState, useEffect } from 'react';
import './ImageFeed.css';
//import getImg from '../getImg';
import { Link } from 'react-router-dom';
import firebase from "../firebase";
// import Footer from './footer';
//import PopUp from '../components/PostPopUp';

let setSelectedImgId;

//  const Getall = async() =>{
//     let doc  = await firebase.GetAllUserChannelPosts();
//     console.log(doc.documents);
//     console.log("test");
//     return doc;
//     }
const ImageFeed = () => {

    const [liked, setLiked] = useState(false);
    //const [docs, setDocs] = useState([]);
    const [button, setButton] = useState("far fa-heart");


    // useEffect(() => {
    //     const getAll = async () => {
    //         await firebase.GetAllUserChannelPosts()
    //             .then(posts => {

    //                 setDocs(posts);
    //                 console.log(posts);

    //             })
    //             .catch(err => console.error(err));
    //     };
    //     getAll();
    // });
    const { docs } = firebase.GetTopPosts('posts');

    const likepost = async (postref) => {
        const alreadyLiked = await firebase.AlreadyLiked(postref);

        if (liked === false) {
            setLiked(true);
            setButton("fas fa-heart")

            console.log(alreadyLiked);
            if (alreadyLiked == false) {
                firebase.LikePost(postref);
            }
        } else {
            setLiked(false);
            setButton("far fa-heart")
            if (alreadyLiked == true) {
                firebase.UnlikePost(postref);
            }
        }
    };
    return (

        <div className="imageFeed">

            {
                docs && docs.map(doc => (
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
                                <Link to="/PictureThat/Report"><div className="reportb" onClick={() => { setSelectedImgId = doc.id }}>Report</div></Link>

                            </div>
                        </div>

                        <div>
                            <img src={doc.url} alt="" className="image" />
                        </div>

                        <div className="bottominfo">
                            <div className="postDetailsContainer">

                                <div className="buttonfield">
                                    <div onClick={() => likepost(doc.id)} className={button} />
                                    <Link to="/PictureThat/FullPostPage"><div className="far fa-comment" onClick={() => { setSelectedImgId = doc.id }} /></Link>
                                </div>
                                <div className="">
                                    <label className="">Score: {doc.likes}</label>
                                    <br></br>
                                    <label>Caption: {doc.caption} </label>
                                    <br></br>
                                    <label>Channel: {doc.channelName} </label>
                                    <br></br>
                                    <label>Date: </label>
                                </div>
                            </div>

                        </div>
                    </div>
                ))
            }

        </div>
    )


}

export default ImageFeed;
export { setSelectedImgId };

//the source bellow was used to help set up how to send and get data from database
//https://www.youtube.com/watch?v=vUe91uOx7R0&ab_channel=TraversyMedia
//https://www.youtube.com/watch?v=vUe91uOx7R0

//<input type="text" className="commentinput" placeholder="Add a comment"></input>
//<button onClick={openPopUp}>Show Modal</button>
//<PopUp showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
