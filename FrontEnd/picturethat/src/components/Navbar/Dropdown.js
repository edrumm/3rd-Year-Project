import React from 'react';
import { Link } from 'react-router-dom';
import './Dropdown.css';

function Dropdown() {
    
    return (
        <>
        <div>
                <ul className="dropdown">
                    <li>
                        <Link to='/PictureThat/ProfilePage'><a>Profile</a></Link>
                    </li>
                    <li>
                        <Link to='/' ><a>Settings</a></Link>
                    </li>
                    <li>
                        <Link to='/' ><a>Logout</a></Link>
                    </li>
                </ul>
          </div>      
        </>
    );
}

export default Dropdown;

//https://www.youtube.com/watch?v=T2MhVxJxsL0&ab_channel=BrianDesign