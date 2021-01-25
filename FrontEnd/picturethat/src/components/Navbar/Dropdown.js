import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {DropdownItems} from './DropdownItems';
import './Dropdown.css';

function Dropdown() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    return (
        <>
        <ul onClick={handleClick} className={click ? 'dropdown clicked' : 'dropdown'}>
            {DropdownItems.map((item, index) => {
                return (
                    <li key={index}>
                    <Link className={item.className} to={item.path} onClick={() => setClick(false)}>
                        {item.title}
                    </Link>
                    </li>
                );
            })}
        </ul>
        </>
    );
}

export default Dropdown;