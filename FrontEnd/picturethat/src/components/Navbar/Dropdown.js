import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Dropdown.css';
import {Logout} from '../../firebase';

function Dropdown() {

  const history = useHistory();

  const logout = () => {
    Logout()
    .then(() => history.push('/'))
    .catch(err => console.error(err));
  };

    return (
        <>
        <div className="dropdownposition">
                <ul className="dropdown">
                    <li>
                        <Link to='/PictureThat/ProfilePage' className="fas fa-user-circle b"><a href="/PictureThat/ProfilePage"> Profile</a></Link>
                    </li>
                    <li>
                        <Link to='/PictureThat/Settings' className="fas fa-cog b" href=""><a href="/PictureThat/Settings"> Settings</a></Link>
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
