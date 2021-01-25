import React from 'react';
import { Link } from 'react-router-dom';
import './Dropdown.css';

function Dropdown() {
    
    return (
        <>
        <div>
                <ul className="dropdown">
                    <li>
                        <Link to='/PictureThat/ProfilePage' className='dropown-link'/><a>Profile</a>
                    </li>
                    <li>
                        <Link to='/' className='dropown-link'/><a>Settings</a>
                    </li>
                    <li>
                        <Link to='/' className='dropown-link'/><a>Logout</a>
                    </li>
                </ul>
          </div>      
        </>
    );
}

export default Dropdown;