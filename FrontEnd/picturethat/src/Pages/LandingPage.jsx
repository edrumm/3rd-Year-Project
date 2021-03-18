import React from 'react';
import ImageFeed from '../components/ImageFeed';
import Navbar from '../components/Navbar/Navbar';

import firebase from '../firebase';

const LandingPage  = () => {
  firebase.getUser();
  
    return (
    <>
    <Navbar />
    <ImageFeed />
    </>
    );
};

export default LandingPage;

//https://www.youtube.com/watch?v=hjR-ZveXBpQ
