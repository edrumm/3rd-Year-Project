import React from 'react';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import "../Pages/Settings.css";
import firebase from "../firebase.js";

const deleteAcount = () => {
    firebase.deleteUser();
}

const DeleteAccount = () => {
    return(
    <>
        <div className="changePassword">
            <form>

                <label>Delete Account: </label>
                <br></br>

                <Link to='/'><button
                    id="signInButton" 
                    className="buttonSettings"
                    onClick={deleteAcount}
                >
                        Delete
                </button></Link>
            </form>
        </div>
    </>
    );
};

export default DeleteAccount;