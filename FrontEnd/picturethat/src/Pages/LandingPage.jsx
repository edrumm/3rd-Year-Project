import React, { Suspense } from 'react';
//import ImageFeed from '../components/ImageFeed';
import Navbar from '../components/Navbar/Navbar';

const ImageFeed = React.lazy(async () => {
   let data = await import('../components/ImageFeed')
    return data
});

const LandingPage  = () => {

    return (
    <>
    <Navbar />
    <Suspense fallback={<div>Loading...</div>}>
        <ImageFeed />
    </Suspense>
    </>
    );
};

export default LandingPage;

//https://www.youtube.com/watch?v=hjR-ZveXBpQ
