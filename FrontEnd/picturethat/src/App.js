import React from 'react';
import './App.css';
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import fire from '../src/FireBaseConnection/fire';

//import the components
//import Authorization from './components/Authorization';
import UploadImage from './components/UploadImage';
import Navbar from "./components/Navbar/Navbar";

//Import the pages
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import LandingPage from "./Pages/LandingPage";
import NotFound from "./Pages/404";

function App() {
  
//   //states for the user, email and password
//     //set to an empty string
//     const [user, setUser] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     //states for the error messages for the email and password
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');

//     //state for if there is already an account
//     //initially set to false using useState hook
//     //const [accountPresent, setAccountPresent] = useState(false);

//     //function to clears the inputs of the email and password
//     const clearInputs = () => {
//         setEmail('');
//         setPassword('');
//     }

//     //function to clears the error message of the email and password
//     const clearErrors = () => {
//         setEmailError('');
//         setPasswordError('');
//     }

//     //function to handle the login
//     const login = () => {

//         //call clearErrors
//         clearErrors();

//         //use firebase methods to authenticate a user when login
//         //using signInWithEmailAndPassword
//         fire
//         .auth()
//         .signInWithEmailAndPassword(email, password)

//         //error handling
//         .catch((err) => {
//             switch (err.code) {

//                 //error codes for invalid email
//                 case "auth/invalid-email":
//                 case "auth/user-disabled":
//                 case "auth/user-not-found":

//                     //if any of these errors arise
//                     //setEmailError state to hold a message
//                     setEmailError(err.message);
//                     break;

//                 //error codes for invalid password
//                 case "auth/wrong-password":

//                     //if any of these errors arise
//                     //setPasswordError state to hold a message
//                     setPasswordError(err.message);
//                     break;
//             };
//         });

//     };

//     //function to authenticate a user and to check if a user with
//     //such credentials already exists
//     const authorizeUser = () => {
//         fire.auth().onAuthStateChanged(user => {

//             //if there is a user setUser to that user
//              if(user){
//                  //clear the inputs
//                  clearInputs();
//                  setUser(user);
//              }

//              //if there is no user set user to an empty string
//              if(!user){
//                  setUser('');
//              };
//         });
//     };

//     //function to handle the signUp
//     const signingUp = () => {

//         //call clearErrors
//         clearErrors();
                
//         //use firebase methods to authenticate a user when signing in
//         //using signInWithEmailAndPassword
//         fire
//         .auth()
//         .createUserWithEmailAndPassword(email, password)
        
//         //error handling
//         .catch((err) => {
//             switch (err.code) {
        
//             //error codes for email already in use or an invalid email
//             case "auth/email-already-in-use":
//             case "auth/invalid-email":
        
//             //if any of these errors arise
//             //setEmailError state to hold a message
//             setEmailError(err.message);
//             break;
        
//             //error codes for weak password
//             case "auth/weak-password":
        
//                 //if any of these errors arise
//                 //setPasswordError state to hold a message
//                 setPasswordError(err.message);
//                 break;
//             };
//     }); 
//     }

//     useEffect(() => {
//         authorizeUser();
//     }, []);

    // logs out a user 
    // const logout = () =>{
    //     fire.auth().signOut();
    // }

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

        </Switch>
      </Router>


    </>
  )
}

export default App;

// used this tutorial to set up a navigation bar: https://www.youtube.com/watch?v=fL8cFqhTHwA&t=378s
//https://www.youtube.com/watch?v=hjR-ZveXBpQ