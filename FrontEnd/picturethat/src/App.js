import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

//import the components
import UploadImage from './components/UploadImage';
import Navbar from "./components/Navbar/Navbar";

//Import the pages
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import LandingPage from "./Pages/LandingPage";
import NotFound from "./Pages/404";
import profilePage from './Pages/profilePage';
import EditProfile from './Pages/EditProfile';
import UploadPage from './Pages/UploadPage';

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
          <Route exact path= "/PictureThat/ProfilePage" component={profilePage} />
          <Route exact path= "/PictureThat/EditProfile" component={EditProfile} />
          <Route exact path= "/PictureThat/UploadPage" component={UploadPage} />

          <Route exact path="/404" component={NotFound} />
          <Redirect to="/404"/> {/*Redirect used to redirect users to 404 page if an invalid url is typed in the url searchbar */}

          <Navbar />
          <UploadImage />
        </Switch>
      </Router>


    </>
  )
}

export default App;

// used this tutorial to set up a navigation bar: https://www.youtube.com/watch?v=fL8cFqhTHwA&t=378s
//https://www.youtube.com/watch?v=hjR-ZveXBpQ