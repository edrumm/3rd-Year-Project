import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import './Achivements.css';
import getData from '../getData';

const AchievementsPage = () => {

    const { docs } = getData('achievements');
    console.log(docs);

    return (
        <>
        <Navbar></Navbar>

        <div className="AchivementsPage">

            {docs && docs.map(doc => (
            
            <div className= "achievementBlock">
                <label> {doc.achievement} </label>
                <label className={doc.class}/>
                <div className="divider"></div>
            </div>

        ))}

        </div>

        </>
    );
};

export default AchievementsPage;