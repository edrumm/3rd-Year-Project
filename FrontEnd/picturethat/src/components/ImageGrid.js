import React from 'react';
import { Link } from 'react-router-dom';
import firebase from "../firebase.js";
import './ImageGrid.css';
import {motion} from 'framer-motion';

let setSelectedImgId;

const ImageGrid = () => {
    const { docs } = firebase.GetPostofUser();
    return (
        <div className= "imageGrid">
            {docs && docs.map(doc => (
                <motion.div className="imageWrap" key={doc.id} layout whileHover={{opacity: 1}} >
                      <Link to="/PictureThat/FullPostPage"><motion.img src={doc.url} alt="" initial={{opacity: 0}} animate= {{opacity: 1}} transition={{delay: 0.2}} onClick={() => {setSelectedImgId = doc.id}}/></Link>
                </motion.div>
            ))}
        </div>
    )
}

export default ImageGrid;
export {setSelectedImgId};

//https://www.youtube.com/watch?v=vUe91uOx7R0