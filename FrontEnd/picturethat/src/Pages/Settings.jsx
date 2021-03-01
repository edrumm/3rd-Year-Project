import React, { useState } from 'react';
import ChangePassword from '../components/ChangePassword';
import ChangeEmail from '../components/ChangeEmail';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/footer';
import './Settings.css';


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
                    tags: ["delete"],
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

        <div className="SearchBar">
            <input 
                type="text"
                placeholder="Search..."
                onChange= {filterSearchBar}/>
        </div>

        <div className="Account">
            {visibleOptions.map((option) => <div key={option.header.name}>

                <h3>{option.header.name}</h3>

                <div>
                    {option.values.map((value) => <div key={value.name}>
                        <ul>
                            <li>
                                <h6>{value.name}</h6>
                                <p>{value.description}</p>
                                <div>{value.tags}</div>
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