import React from 'react';
import ChangePassword from '../components/ChangePassword';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/footer';

const Settings = () => {

    return (
        <>
        <Navbar></Navbar>
        <ChangePassword></ChangePassword>
        <Footer />
        </>
    );
};

export default Settings;