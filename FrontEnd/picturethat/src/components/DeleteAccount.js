import React from 'react';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import "../Pages/Settings.css";


const DeleteAccount = () => {
    return(
    <>
        <div className="changePassword">
            <form>

                <label>Delete Account: </label>
                <br></br>

                <button
                    id="signInButton" 
                    className="buttonSettings"
                >
                        Delete
                </button>
            </form>
        </div>
    </>
    );
};

export default DeleteAccount;