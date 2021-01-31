import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import './Achivements.css';
import getData from '../getData';

const AchievementsPage  = () => {

    const { docs } = getData('achivements');
    console.log(docs);

    return (
        <>
        <Navbar></Navbar>
        <div className="AchivementsPage">
        <div>
        <label>Received 10 total score </label>
        <lable className="fas fa-check"/>
        </div>
        </div>

        </>
    );
};

export default AchievementsPage;