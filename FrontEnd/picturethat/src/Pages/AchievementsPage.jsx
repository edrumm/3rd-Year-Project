import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import './Achivements.css';
import firebase from "../firebase.js";

const AchievementsPage = () => {

    const { docs } = firebase.GetData('achievements');
    console.log(docs);

    return (
        <>
        <Navbar></Navbar>
        <div className="AchivementsPage">

            {docs && docs.map(doc => (

            <div className= "achievementBlock">
                <label> {doc.description} </label>
                <label className={doc.class}> {doc.score} </label>
                <div className="divider"></div>
            </div>
        ))}
        </div>
        </>
    );
};

export default AchievementsPage;
