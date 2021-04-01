import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

// MAIN App page

//Import the pages
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import LandingPage from "./Pages/LandingPage";
import NotFound from "./Pages/404";
import ProfilePage from './Pages/ProfilePage';
import EditProfile from './Pages/EditProfile';
import UploadPage from './Pages/UploadPage';
import AchievementsPage from './Pages/AchievementsPage';
import ChannelsPage from './Pages/ChannelsPage';
import Settings from './Pages/Settings';
import ChannelPhotos from './Pages/channelphotospage';
import FullPostPage from './Pages/FullPostPage';
import TermsAndConditions from './Pages/TermsAndConditions';
import FullPostChannel from './Pages/FullPostChannel';
import TopPosts from './Pages/TopPosts';
import TopFullPost from './Pages/TopFullPost';
import Report from './Pages/Report';
import ReportC from './Pages/ReportC';
import ReportT from './Pages/ReportT';
import ProfileFullPost from './Pages/ProfileFullPost';
import ContactPage from './Pages/ContactPage';

// app entry point
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
          <Route exact path= "/PictureThat/ProfilePage" component={ProfilePage} />
          <Route exact path= "/PictureThat/ProfilePage/EditProfile" component={EditProfile} />
          <Route exact path= "/PictureThat/UploadPage" component={UploadPage} />
          <Route exact path= "/PictureThat/ProfilePage/Achievements" component={AchievementsPage} />
          <Route exact path= "/PictureThat/ChannelsPage" component={ChannelsPage} />
          <Route exact path= "/PictureThat/Settings" component={Settings} />
          <Route exact path= "/PictureThat/channelphotospage" component={ChannelPhotos} />
          <Route exact path= "/PictureThat/FullPostPage" component={FullPostPage} />
          <Route exact path= "/PictureThat/TermsAndConditions" component={TermsAndConditions}/>
          <Route exact path= "/PictureThat/FullPostChannel" component={FullPostChannel} />
          <Route exact path= "/PictureThat/TopPosts" component={TopPosts} />
          <Route exact path= "/PictureThat/TopFullPost" component={TopFullPost} />
          <Route exact path= "/PictureThat/Report" component={Report} />
          <Route exact path= "/PictureThat/ReportC" component={ReportC} />
          <Route exact path= "/PictureThat/ReportT" component={ReportT} />
          <Route exact path= "/PictureThat/ProfileFullPost" component={ProfileFullPost} />
          <Route exact path= "/PictureThat/ContactPage" component={ContactPage} />

          <Route exact path="/404" component={NotFound} />
          <Redirect to="/404"/> {/*Redirect used to redirect users to 404 page if an invalid url is typed in the url searchbar */}

        </Switch>
      </Router>
    </>
  )
}

export default App;

// used this tutorial to set up a navigation bar: https://www.youtube.com/watch?v=fL8cFqhTHwA&t=378s
