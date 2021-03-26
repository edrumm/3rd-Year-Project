import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Report.css';
import firebase from "../firebase.js";
//import ImageFeed from "./ImageFeed";
import { SelectedImgId } from './TopPosts';


const FullPost = () => {
    const selectedImg = SelectedImgId;

    const singlePost = firebase.GetSinglePost(selectedImg);

    const [reason, setReason] = useState('');


    const RPost = () => {
        firebase.reportPost(selectedImg, reason);
        setReason("");

    }





    return (
        <>
            <div className="backbutton">
                <Link to="/PictureThat/TopPosts" className="fas fa-arrow-left" />
            </div>
            <div className="FullPostR">
                <div class="cardR">

                    <div>
                        <img src={singlePost.url} alt="" className="imagestyleR" />
                    </div>

                    <div className="fullpostinfoR">
                        <div>Reporting a post</div>
                        <input type="text"
                            className="inputTextR"
                            placeholder="Add reason for repoting"
                            value={reason}
                            onChange={(e) => { setReason(e.target.value) }}
                        />
                        <div>By reporting the post this will create a case which the admin team will look into</div>
                        <button className="Rbutton" id="rtext" onClick={RPost}>Report</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default FullPost;