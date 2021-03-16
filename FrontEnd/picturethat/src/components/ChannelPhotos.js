import React, { useState } from 'react';
import dog from '../components/ImageFiles/iz-phil-pdALzg0yN-8-unsplash.jpg';
import './ImageFeed.css';
//import getImg from '../getImg';
import {Link} from 'react-router-dom';
import firebase from "../firebase.js";
//import PopUp from '../components/PostPopUp';
import {setSelectedChannel} from '../components/Channel';

let setSelectedImgId;


const ImageFeed = () => {
    const { docs } = firebase.GetPostofChannels('posts');
    console.log(docs);

    let currentChannel = setSelectedChannel;
    console.log(currentChannel);
    
    
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
      
        <div className= "imageFeed">
            { docs && docs.map(doc => (
                <div class="post" key={doc.id}>
                    <div className="postDetailsContainer">
                    <div className="topinfo">
                    <div className="user">
                            <img src={dog} alt="" className="profileimage"/>
                            <br></br>
                            <div className="profilecard">
                            <label className="profileN">Username</label>
                            <br></br>
                            <label className="location">{doc.location} </label>
                            </div>
                            </div>
                            <br></br>
                            <lable className="reportb">Report</lable>

                    </div>
                    </div>

                    <div>
                        <img src={doc.url} alt="" className="image"/>
                    </div>
                    
                    <div className="bottominfo">
                    <div className="postDetailsContainer">
                    <div className="buttonfield">
                    <a className="far fa-heart" />
                    <Link to="/PictureThat/FullPostPage"><a className="far fa-comment" onClick={() => {setSelectedImgId = doc.id}}/></Link>
                    </div>
                    <div className="">
                        <label className="">Score:</label>
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

export default ImageFeed ;
export {setSelectedImgId};



//the source bellow was used to help set up how to send and get data from database
//https://www.youtube.com/watch?v=vUe91uOx7R0&ab_channel=TraversyMedia 
//https://www.youtube.com/watch?v=vUe91uOx7R0

//<input type="text" className="commentinput" placeholder="Add a comment"></input>
//<button onClick={openPopUp}>Show Modal</button>
//<PopUp showPopUp={showPopUp} setShowPopUp={setShowPopUp} />