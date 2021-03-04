import React, { useState } from 'react';
import dog from '../components/ImageFiles/iz-phil-pdALzg0yN-8-unsplash.jpg';
import './ImageFeed.css';
import getImg from '../getImg';
import {Link} from 'react-router-dom';
//import PopUp from '../components/PostPopUp';

const ImageFeed = () => {
    const { docs } = getImg('posts');
    console.log(docs);

    const [showPopUp, setShowPopUp] = useState(false);

    const openPopUp = () => {
        setShowPopUp(prev => !prev)
    };
      
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
                            <label className="location">{doc.loc} </label>
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
                    <Link to="/PictureThat/FullPostPage" className="far fa-comment" />
                    </div>
                    <div className="">
                        <label className="">Score:</label>
                        <br></br>
                        <label>Caption: {doc.title} </label>
                        <br></br>
                        <label>Channel: {doc.channel} </label>
                        <br></br>
                        <label>Date</label>
                    </div>
                </div>
                
            </div>
        </div>
        ))}
    </div>
    )
}

export default ImageFeed;

//the source bellow was used to help set up how to send and get data from database
//https://www.youtube.com/watch?v=vUe91uOx7R0&ab_channel=TraversyMedia 
//https://www.youtube.com/watch?v=vUe91uOx7R0

//<input type="text" className="commentinput" placeholder="Add a comment"></input>
//<button onClick={openPopUp}>Show Modal</button>
//<PopUp showPopUp={showPopUp} setShowPopUp={setShowPopUp} />