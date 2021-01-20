import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import './App.css';
import UploadImage from './components/UploadImage';

import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';

//Import the pages
import SignIn from "./Pages/SignIn";
import NotFound from "./Pages/404";


function App() {
  return (
    
    <Router> {/*Router is used to create the different routes - connections between the pages of the app*/}
      <Switch> {/*Switch is used to switch between the different routes established in the app */}

        <Route exact path="/" component={SignIn} /> {/*route path of the specific page - when used with keyword exact - in the app */}
        <Route exact path="/SignIn" component={SignIn} />

        <Route exact path="/404" component={NotFound} />
        <Redirect to="/404"/> {/*Redirect used to redirect users to 404 page if an invalid url is typed in the url searchbar */}

        <Navbar />
        <UploadImage />

      </Switch>
    </Router>
  )
}

export default App;


//https://www.youtube.com/watch?v=hjR-ZveXBpQ