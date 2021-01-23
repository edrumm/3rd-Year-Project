import React from 'react';
import {useState, useEffect} from 'react';
import firebase from './FireBaseConnection';

const Authorization = () => {
     //states for the user, email and password
    //set to an empty string
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //states for the error messages for the email and password
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    //state for if there is already an account
    //initially set to false using useState hook
    const [accountPresent, setAccountPresent] = useState(false);

    //function to clears the inputs of the email and password
    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }

    //function to clears the error message of the email and password
    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    //function to handle the login
    const login = () => {

        //call clearErrors
        clearErrors();

        //use firebase methods to authenticate a user when login
        //using signInWithEmailAndPassword
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)

        //error handling
        .catch((err) => {
            switch (err.code) {

                //error codes for invalid email
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":

                    //if any of these errors arise
                    //setEmailError state to hold a message
                    setEmailError(err.message);
                    break;

                //error codes for invalid password
                case "auth/wrong-password":

                    //if any of these errors arise
                    //setPasswordError state to hold a message
                    setPasswordError(err.message);
                    break;
            };
        });

    };

    //function to authenticate a user and to check if a user with
    //such credentials already exists
    const authorizeUser = () => {
        firebase.auth().onAuthStateChange(user => {

            //if there is a user setUser to that user
             if(user){
                 //clear the inputs
                 clearInputs();
                 setUser(user);
             }

             //if there is no user set user to an empty string
             if(!user){
                 setUser('');
             };
        });
    };

    //function to handle the signUp
    const signUp = () => {

        //call clearErrors
        clearErrors();
                
        //use firebase methods to authenticate a user when signing in
        //using signInWithEmailAndPassword
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        
        //error handling
        .catch((err) => {
            switch (err.code) {
        
            //error codes for email already in use or an invalid email
            case "auth/email-already-in-use":
            case "auth/invalid-email":
        
            //if any of these errors arise
            //setEmailError state to hold a message
            setEmailError(err.message);
            break;
        
            //error codes for weak password
            case "auth/weak-password":
        
            //if any of these errors arise
            //setPasswordError state to hold a message
            setPasswordError(err.message);
            break;
            };
    });

    useEffect(() => {
        authorizeUser();
    }, []);
    }

    //logs out a user 
    const logout = () =>{
        firebase.auth().signOut();
    }
    
}

export default Authorization;