import React from 'react';
import { Link } from 'react-router-dom';
import './Dropdown.css';

function Dropdown() {
    
    return (
        <>
        <div>
                <ul className="dropdown">
                    <li>
                        <Link to='/PictureThat/ProfilePage' className="fas fa-user-circle b"><a> Profile</a></Link>
                    </li>
                    <li>
                        <Link to='/' className="fas fa-cog b"><a> Settings</a></Link>
                    </li>
                    <li>
                        <Link to='/' class="fas fa-sign-out-alt"><a> Logout</a></Link>
                    </li>
                </ul>
          </div>      
        </>
    );
}

export default Dropdown;

//https://www.youtube.com/watch?v=T2MhVxJxsL0&ab_channel=BrianDesign