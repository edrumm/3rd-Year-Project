import React from 'react';
import { Link } from 'react-router-dom';
import firebase from "../firebase.js";
import './ImageGrid.css';
import {useHistory} from 'react-router-dom';

let setSelectedImgId;

const ImageGrid = () => {
    //const user = firebase.getUser().displayName;
    const { docs } = firebase.GetPostofUser();
    //console.log(docs);

    const history = useHistory();

    return (
        <div className= "imageGrid">
            {docs && docs.map(doc => (
                <div className="imageWrap" key={doc.id}>
                      <Link to="/PictureThat/FullPostPage"><img src={doc.url} alt="" onClick={() => {setSelectedImgId = doc.id}}/></Link>
                </div>
            ))}
        </div>
    )
}

export default ImageGrid;
export {setSelectedImgId};

//https://www.youtube.com/watch?v=vUe91uOx7R0