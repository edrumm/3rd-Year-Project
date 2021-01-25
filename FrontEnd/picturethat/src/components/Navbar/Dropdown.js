import React from 'react';
import { Link } from 'react-router-dom';
import './Dropdown.css';

function Dropdown() {
    
    return (
        <>
        <div>
                <ul className="dropdown">
                    <li>
                        <Link to='/PictureThat/ProfilePage'/><a>Profile</a>
                    </li>
                    <li>
                        <Link to='/'/><a>Settings</a>
                    </li>
                    <li>
                        <Link to='/'/><a>Logout</a>
                    </li>
                </ul>
          </div>      
        </>
    );
}

export default Dropdown;