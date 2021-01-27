// import React from 'react';
// import Navbar from '../components/Navbar/Navbar';
// import {Link} from 'react-router-dom';
// //import 'antd/dist/antd.css';
// import {Avatar} from 'antd';
// import {UserOutlined} from '@ant-design/icons';
// import { useState } from 'react';
// import ProfilePictureUpload from '../components/ProfilePictureUpload';

// //imports for the dropdown menu
// import Button from '@material-ui/core/Button';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
// import Popper from '@material-ui/core/Popper';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuList from '@material-ui/core/MenuList';
// import { makeStyles } from '@material-ui/core/styles';

// //import for the photo camera icon
// import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
// //import { IconButton } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       display: 'flex',
//     },
//     paper: {
//       marginRight: theme.spacing(2),
//     },
//   }));

//  const EditProfile  = () => {

//     const inputReference = React.useRef();

//     const filePopup = () => inputReference.current.click();
    
     
//     const classes = useStyles();
//     const [open, setOpen] = React.useState(false);
//     const anchorRef = React.useRef(null);

//     const handleToggle = () => {
//         setOpen((prevOpen) => !prevOpen);
//     };

//     const handleClose = (event) => {
//         if (anchorRef.current && anchorRef.current.contains(event.target)) {
//         return;
//     }

//     setOpen(false);
//     };

//     function handleListKeyDown(event) {
//         if (event.key === 'Tab') {
//             event.preventDefault();
//             setOpen(false);
//         }
//     }

//   // return focus to the button when we transitioned from !open -> open
//     const prevOpen = React.useRef(open);
//         React.useEffect(() => {
//             if (prevOpen.current === true && open === false) {
//                     anchorRef.current.focus();
//             }

//             prevOpen.current = open;
//             }, [open]);

//     const [showUploadImage, setShowUploadImage] = useState(null);

//     return (
//         <>
//         <div>
//             <Navbar></Navbar>

//             <h2>EditProfile</h2>
//             <input 
//                 type="text"
//                 id= "inputbox"
//                 placeholder="Edit Username"
//                 autoFocus
//             />

//             <div className="ImageGrid">
//                 <div className="imageWrap">
//                     <Avatar size={128} icon={<UserOutlined />} />
//                         <div>

//                         <IconButton
//                             ref={anchorRef}
//                             aria-controls={open ? 'menu-list-grow' : undefined}
//                             aria-haspopup="true"
//                             onClick={handleToggle}
//                             >

//                             {/* Display the photo camera icon as the button*/}
//                             <PhotoCameraIcon fontSize= "large"/>
//                         </IconButton>

//                         <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
//                         {({ TransitionProps, placement }) => (
//                             <Grow
//                             {...TransitionProps}
//                             style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
//                             >
//                             <Paper>
//                                 <ClickAwayListener onClickAway={handleClose}>
//                                 <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>

//                                     {/*When you press the change photo menu Item input for requested image pops up */}
//                                     <input 
//                                         type="file"
//                                         accept="image*"
//                                         ref={inputReference}
//                                         style={{display:"none"}}
//                                     />
//                                     <MenuItem 
//                                         onClick= {(event) => {
//                                             filePopup();
//                                             handleClose(event);
//                                         }}
//                                     >
//                                             Change Photo
//                                     </MenuItem>

//                                     <MenuItem 
//                                         onClick= {(event) => {
//                                             handleClose(event);
//                                         }}
//                                     >
//                                             Cancel
//                                     </MenuItem>
                                    
//                                 </MenuList>
//                                 </ClickAwayListener>
//                             </Paper>
//                             </Grow>
//                         )}
//                         </Popper>

//                         </div>
//                 </div>
//             </div>

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
//     </>
//     );
// };

// export default EditProfile;

// // //https://www.youtube.com/watch?v=5AK37Wy5eNs
// // //https://codesandbox.io/s/reb0z?file=/index.js:172-192
// //https://www.youtube.com/watch?v=RmiP1AY5HFM
