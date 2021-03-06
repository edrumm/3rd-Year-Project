import React from 'react';
import { Redirect, Route } from 'react-router';
import ImageFeed from '../components/ImageFeed';
import Navbar from '../components/Navbar/Navbar';
import { withRouter } from 'react-router';

const LandingPage  = ({isAuth: isAuth, component: Component, ...rest}) => {
    return (
    <Route {...rest} render={(props) => {
        if(isAuth){
            return(
                <>
                <ImageFeed />
                <Navbar/>
                </>
            );
        }
        else{
            return(
                <Redirect to={{pathname:"/", state: {from: props.location}}}/>
            );
        };
    }}
    />
    );
};

export default withRouter(LandingPage);

//https://www.youtube.com/watch?v=hjR-ZveXBpQ