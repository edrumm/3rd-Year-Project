<<<<<<< Updated upstream
// import React from 'react';
// import Navbar from '../components/Navbar/Navbar';
// import {Link} from 'react-router-dom';
// //import 'antd/dist/antd.css';
// //import {Avatar} from 'antd';
// //import {UserOutlined} from '@ant-design/icons';
// //import { Modal, Button } from 'antd';
// import { useState } from 'react';
// import pic1 from '../components/ImageFiles/File_000.jpeg';
=======
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import ProfilePicChanger from '../components/ProfilePicChanger';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import {Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import { useState } from 'react';
import pic1 from '../components/ImageFiles/File_000.jpeg';
>>>>>>> Stashed changes

// // const EditProfile  = () => {

<<<<<<< Updated upstream
//     //state to check if the modal is visible
//     const [modalVisible, setModalVisible] = useState(false);
      
//     //function to set modal to visible afer modal button has been clicked
//     const showModal = () => {
//         setModalVisible(true);
//     };
     
//     //function to set modal visiblility to false after ok has been clicked
//     const handleOk = () => {
//         setModalVisible(false);
//     };
     
//     //function to set modal visiblity to false after cancel has been clicked
//     const handleCancel = () => {
//         setModalVisible(false);
//     };
=======
    const [profileImage, setProfileImage] = useState(null);

    const handleProfileImage = () =>{
        setProfileImage(profileImage);
    }
>>>>>>> Stashed changes

//     return (
//         <div>
//             <Navbar></Navbar>

//             <h2>EditProfile</h2>
//             <input 
//                 type="text"
//                 id= "inputbox"
//                 placeholder="Edit Username"
//                 autoFocus
//             />

<<<<<<< Updated upstream
//             <div className="ImageGrid">
//                 <div className="imageWrap">
//                 <Avatar size={64} icon={<UserOutlined />} />
//                 </div>
//             </div>

//             <Button type="primary" onClick={showModal}>
//                 Open Modal
//             </Button>
//             <Modal title="Profile Picture Changer" visible={modalVisible} onOk={handleOk} onCancel={handleCancel}>
//                 <p>Some contents...</p>
//                 <p>Some contents...</p>
//                 <p>Some contents...</p>
//             </Modal>
=======
            <div className="ImageGrid">
                <div className="imageWrap">
                <Avatar size={64} icon={<UserOutlined />} src= {profileImage} />
                </div>
            </div>

            <ProfilePicChanger handleProfileImage= {handleProfileImage} pic1= {pic1}/>
            <img src= {pic1}/>
>>>>>>> Stashed changes

//             <input 
//                 type="text"
//                 id= "inputbox"
//                 placeholder="Edit Realname"
//                 autoFocus
//             />

//             <input 
//                 type="text"
//                 id= "inputbox"
//                 placeholder="Edit Bio"
//                 autoFocus
//             />

//             <Link to="/PictureThat/profilePage">    
//                 <button 
//                     id="signInButton" 
//                     className="signInButton">
//                         Confirm
//                 </button>
//             </Link>
//     </div>
//     );
// };

// export default EditProfile;

// //https://www.youtube.com/watch?v=5AK37Wy5eNs
// //https://codesandbox.io/s/reb0z?file=/index.js:172-192
// //https://ant.design/components/modal/