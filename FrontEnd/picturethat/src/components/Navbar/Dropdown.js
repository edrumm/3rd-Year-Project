import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Dropdown.css';
import firebase from '../../firebase';

function Dropdown() {

  const history = useHistory();

  const logout = () => {
    firebase.logout()
    .then(() => history.push('/'))
    .catch(err => console.error(err));
  };

    return (
        <>
        <div>
                <ul className="dropdown">
                    <li>
                        <Link to='/PictureThat/ProfilePage' className="fas fa-user-circle b"><a href="#/">Profile</a></Link>
                    </li>
                    <li>
                        <Link to='/PictureThat/Settings' className="fas fa-cog b" href=""><a href="#/">Settings</a></Link>
                    </li>
                    <li onClick= {logout}>
                        <Link to='/' class="fas fa-sign-out-alt" href="" ><a href="#/"> Logout</a></Link>
                    </li>
                </ul>
          </div>
        </>
    );
}

export default Dropdown;

//https://www.youtube.com/watch?v=T2MhVxJxsL0&ab_channel=BrianDesign
