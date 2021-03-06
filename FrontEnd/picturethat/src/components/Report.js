import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Report.css';
import firebase from "../firebase.js";
import { setSelectedImgId } from "./ImageFeed";



const Report = () => {
    const selectedImg = setSelectedImgId;
    const singlePost = firebase.GetSinglePost(selectedImg);

    const Swal = require('sweetalert2');

    const [reason, setReason] = useState(null);

    var reported = "";
    const RPost = () => {
        if(reason === null){
            Swal.fire({
               icon: 'error',
               title: 'Need to add Reason',
             });  
        } else {
        firebase.reportPost(selectedImg, reason);
        setReason("");
        reported = "The case has been passed onto the admin team";
            Swal.fire({
               icon: 'success',
               title: 'Post Reported',
               text: reported,
             });  
        }
        
    }





    return (
        <>
            <div className="backbutton">
                <Link to="/PictureThat" className="fas fa-arrow-left" />
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

export default Report;