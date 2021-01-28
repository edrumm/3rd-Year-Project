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
                        <Link to='/PictureThat' className='fas fa-home a'/>
                    </li>
                    <li>
                        <Link to='/' className='fas fa-search a'/>
                    </li>
                    <li>
                        <Link to='/PictureThat/UploadPage' className='fas fa-images a'/>
                    </li>
                    <li onClick={handleClick} >
                        <i className='fas fa-user-circle'/>
                        {clicked && <Dropdown />}
                    </li>
                </ul>
            </nav>

            <nav className="Navbarbottom">
            <ul className="nav-menubottom">
            <li>
                        <Link to='/PictureThat' className='fas fa-home b'/>
                    </li>
                    <li>
                        <Link to='/' className='fas fa-search b'/>
                    </li>
                    <li>
                        <Link to='/PictureThat/UploadPage' className='fas fa-images b'/>
                    </li>
            </ul>

            </nav>
            </>
            

        )
    }


export default Navbar;