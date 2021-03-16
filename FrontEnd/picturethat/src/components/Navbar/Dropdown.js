import React from 'react';
import { Link } from 'react-router-dom';
import './Dropdown.css';

function Dropdown() {
    
    return (
        <>
        <div>
                <ul className="dropdown">
                    <li>
                        <Link to='/PictureThat/ProfilePage' className="fas fa-user-circle b"><a href="/PictureThat/ProfilePage">Profile</a></Link>
                    </li>
                    <li>
                        <Link to='/PictureThat/Settings' className="fas fa-cog b" href=""><a href="/PictureThat/Settings">Settings</a></Link>
                    </li>
                    <li onClick= {fetch('/api/logout').catch(err => console.error(err))}>
                        <Link to='/' onClick= {fetch('/api/logout').catch(err => console.error(err))} class="fas fa-sign-out-alt" href="" >
                            <Link to="/" onClick= {fetch('/api/logout').catch(err => console.error(err))}> Logout</Link>
                        </Link>
                    </li>
                </ul>
          </div>      
        </>
    );
}

export default Dropdown;

//https://www.youtube.com/watch?v=T2MhVxJxsL0&ab_channel=BrianDesign