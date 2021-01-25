import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';

    function Navbar() {
        const [dropdown, setDropdown] = useState(false);

        const onClickEnter = () => {
            if (setDropdown(false)) {
                setDropdown(true)
            }
        };

        const onClickLeave = () => {
            if (setDropdown(true)) {
                setDropdown(false)
            }
        };

        return(
            <>
            <nav className="Navbar">
                <h1 className="navbar-logo">PictureThat</h1>
                <ul className="nav-menu">
                    <li>
                        <Link to='/PictureThat' className='fas fa-home'/>
                    </li>
                    <li>
                        <Link to='/' className='fas fa-search'/>
                    </li>
                    <li>
                        <Link to='/' className='fas fa-images'/>
                    </li>
                    <li onClickEnter={onClickEnter} onClickLeave={onClickLeave} >
                        <i className='fas fa-user-circle'/>
                        {dropdown && <Dropdown />}
                    </li>
                </ul>
            </nav>

            <nav className="Navbarbottom">
            <ul className="nav-menubottom">
                    <li>
                        <Link to='/PictureThat' className='fas fa-home'/>
                    </li>
                    <li>
                        <Link to='/' className='fas fa-search'/>
                    </li>
                    <li>
                        <Link to='/' className='fas fa-images'/>
                    </li>
                    <li>
                        <Link to='/PictureThat/ProfilePage' className='fas fa-user-circle'/>
                        {dropdown && <dropdown />}
                    </li>
            </ul>

            </nav>
            </>
            

        )
    }


export default Navbar;