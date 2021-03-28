import React, { useState } from 'react';
import ChangePassword from '../components/ChangePassword';
import ChangeEmail from '../components/ChangeEmail';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/footer';
import './Settings.css';
import DeleteAccount from '../components/DeleteAccount';

const Settings = () => {

    const options = [

        {
            header: {
                name: "Account",
            },

            values: [
                {
                    name:"Email Address",
                    description: "Manage your email address",
                    tags: [<ChangeEmail/>],
                },

                {
                    name:"Password",
                    description: "Manage your password",
                    tags: [<ChangePassword/>],
                },

                {
                    name: "Delete Account",
                    description: "Warning! Closing your account is irreversible",
                    tags: [<DeleteAccount/>],
                },
            ],
        },

    ]

    const [visibleOptions, setVisibleOptions]= useState(options);

    const filterSearchBar = (e) => {
        e.preventDefault();
        const value = e.target.value;

        if(value.trim().length === 0){
            setVisibleOptions(options);
            return;
        }

        const returnedValues= [];
        visibleOptions.forEach((option, index) => {
            const foundOptions = option.values.filter(item => {
                return item.name.toLocaleLowerCase().search(value.trim().toLowerCase()) !== -1 || item.description.toLocaleLowerCase().search(value.trim().toLowerCase()) !== -1;
            });

            returnedValues[index] = {
                header: {
                    name: option.header.name,
                },
                values: foundOptions,
            };
        });

        setVisibleOptions(returnedValues);
    };

    return (
        <>
        <Navbar></Navbar>

        <div className="searchBarContainer">
            <input 
                type="text"
                placeholder="Search..."
                autoFocus
                className="SearchBar"
                onChange= {filterSearchBar}/>
        </div>

        <div className="Account">
            {visibleOptions.map((option) => <div className="settingsDivision" key={option.header.name}>

                <h3>{option.header.name}</h3>

                <div className ="settingsDivision">
                    {option.values.map((value) => <div key={value.name}>
                        <ul>
                            <li>
                                <h4>{value.name}</h4>
                                <p>{value.description}</p>
                                <div className="inputFields">{value.tags}</div>
                            </li>
                        </ul>
                    </div>
                    )}
                </div>
            </div>
            )}
        </div>
        <Footer />
        </>
    );
};

export default Settings;