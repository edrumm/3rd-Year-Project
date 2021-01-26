import React from 'react';
import { Modal, Button } from 'antd';
import { useState } from 'react';

const ProfilePicChanger  = () => {

    //state to check if the modal is visible
    const [modalVisible, setModalVisible] = useState(false);
      
    //function to set modal to visible afer modal button has been clicked
    const showModal = () => {
        setModalVisible(true);
    };
     
    //function to set modal visiblility to false after ok has been clicked
    const handleOk = () => {
        setModalVisible(false);
    };
     
    //function to set modal visiblity to false after cancel has been clicked
    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <div>
             <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title="Profile Picture Changer" visible={modalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div> 
    );
};

export default ProfilePicChanger;
