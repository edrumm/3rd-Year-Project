import React, { useState } from 'react';
import ChangePassword from '../components/ChangePassword';
import ChangeEmail from '../components/ChangeEmail';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/footer';
import './Settings.css';
import { Redirect, Route } from 'react-router';


const Settings = ({isAuth: isAuth, component: Component, ...rest}) => {

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

        <Route {...rest} render={(props) => {
            if(isAuth){
                return(
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
                        {visibleOptions.map((option) => <div key={option.header.name}>

                            <h3>{option.header.name}</h3>

                            <div>
                                {option.values.map((value) => <div className="settingContents" key={value.name}>
                                    <ul>
                                        <li>
                                            <h6>{value.name}</h6>
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
            }
            else{
                return(
                    <Redirect to={{pathname:"/", state: {from: props.location}}}/>
                );
            };
        }}
        />
    );
};

export default Settings;