import React, { useState } from 'react';
import './ImageFeed.css';
//import getImg from '../getImg';
import { Link } from 'react-router-dom';
import firebase from "../firebase";
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
    const [button, setButton] = useState("far fa-heart");


    // const report = async (postref) =>{
    //     firebase.reportPost(postref);
    //     console.log("reported?");
    // }

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
    //const testdoc = Getall();
    //console.log(testdoc.documents);
    //const  { docs }  = Getall();

    // const getcposts = async () => {
    //     // var d;
    //     // await firebase.GetAllUserChannelPosts()
    //     //     .then(posts => {
    //     //         d = posts
    //     //         console.log(d)
    //     //     })
    //     // return d;
    //     // firebase.GetAllUserChannelPosts().then(function(result) {
    //     //     console.log(result) // "Some User token"
    //     //  })
    // }

    var docs;
    firebase.GetAllUserChannelPosts().then(function (result) {
        docs = result;
    })
    
    //return selectedImgId;

    // const [showPopUp, setShowPopUp] = useState(false);
    // const openPopUp = () => {
    //     setShowPopUp(prev => !prev)
    // };
    //Getall();
    
    return (

        <div className="imageFeed">

            { docs && docs.map(doc => (
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
                            {/* <label onClick={(report(doc.id))} className="reportb">Report</label> */}

                        </div>
                    </div>

                    <div>
                        <img src={doc.url} alt="" className="image" />
                    </div>

                    <div className="bottominfo">
                        <div className="postDetailsContainer">
                            <div className="buttonfield">
                                <a onClick={() => likepost(doc.id)} className={button} />
                                <Link to="/PictureThat/FullPostPage"><a className="far fa-comment" onClick={() => { setSelectedImgId = doc.id }} /></Link>
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
            ))}

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
