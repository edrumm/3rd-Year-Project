import React from 'react';
import './App.css';
import {useState, useEffect} from 'react';

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

//import the components
import Authorization from './components/Authorization';
import UploadImage from './components/UploadImage';
import Navbar from "./components/Navbar/Navbar";

//Import the pages
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import LandingPage from "./Pages/LandingPage";
import NotFound from "./Pages/404";

function App() {
  return (
    <>
      <Router> {/*Router is used to create the different routes - connections between the pages of the app*/}
        <Switch> {/*Switch is used to switch between the different routes established in the app */}

          <Route exact path= "/" component={SignIn} /> {/*route path of the specific page - when used with keyword exact - in the app */}
          <Route exact path= "/SignIn" component={SignIn} />
          <Route exact path= "/SignUp" component={SignUp} />
          <Route exact path= "/ForgotPassword" component={ForgotPassword} />
          <Route exact path= "/PictureThat" component={LandingPage} />

          <Route exact path="/404" component={NotFound} />
          <Redirect to="/404"/> {/*Redirect used to redirect users to 404 page if an invalid url is typed in the url searchbar */}

          <Navbar />
          <UploadImage />
          <Authorization />

        </Switch>
      </Router>

      <Authorization 
        email= {email}
        setEmail= {setEmail}
        password= {password}
        setPassword= {setPassword}
        login= {login}
        signUp= {signUp}
        accountPresent= {accountPresent}
        emailError= {emailError}
        passwordError= {passwordError}
      />
      
    </>

    
  )
}

export default App;

// used this tutorial to set up a navigation bar: https://www.youtube.com/watch?v=fL8cFqhTHwA&t=378s
//https://www.youtube.com/watch?v=hjR-ZveXBpQ