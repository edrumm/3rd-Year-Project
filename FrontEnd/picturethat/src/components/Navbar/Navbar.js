import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';

    function Navbar() {
        const [clicked, setClicked] = useState(false);

        const handleClick = () => {
           if(clicked === false) {
                setClicked(true);
           } else {
               setClicked(false);
           }
        } ;

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
                    <li onClick={handleClick} >
                        <i className='fas fa-user-circle top'/>
                        {clicked && <Dropdown />}
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
                     <li onClick={handleClick}>
                        <i className='fas fa-user-circle'/>
                        {clicked && <Dropdown />}
                    </li>
                     
            </ul>

            </nav>
            </>
            

        )
    }


export default Navbar;