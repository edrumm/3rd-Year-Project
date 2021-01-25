import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
    



    render () {
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
                    <li>
                        <Link to='/PictureThat/ProfilePage' className='fas fa-user-circle'/>
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
                    </li>
            </ul>

            </nav>
            </>
            

        )
    }
}

export default Navbar