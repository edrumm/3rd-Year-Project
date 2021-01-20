import React from 'react'

//reacthook to allow state manipulation without being coverted into class components
import {useState} from 'react'

const UploadImage = () => {

    //event handler to allow the user to select an image to upload
    const changeImage = event => {

        //allows user to select files from the event
        //files[0] resticts only the first file selected
        let selectedImage = event.target.files[0];

        //if statement to check if selected image is true
        //and to check that the file selected is an image and a format of image allowed
        //if so file selected can be stored in the setImage (A  local state) and no error message is sent to the website
        if(selectedImage && allowedImageTypes.includes(selectedImage.type)){
            setImage(selectedImage);
            setError('');
        }

        //if statement to check that if nothing is selected then nothing is set in setImage local state
        if(selectedImage === false){
            setImage(null);
        }

        //if statement to check if the file selected isnt a valid image type an error message occurs 
        //file is not sent to local state
        if(!allowedImageTypes.includes(selectedImage.type)){
            setImage(null);
            setError('Incorrect file type. Select (PNG, BMP OR JPEG)');
        }
        
    }

    //stores image file in a local piece of state
    //image is set to null as file isnt selected at the start 
    const[image, setImage] = useState(null);

    //create an error for when file selected is incorrect
    const[error, setError] = useState(null);


    //an array of allowed types of images eg. png jpeg bmp
    const allowedImageTypes = ['image/jpeg', 'image/bmp', 'image/png']

    return (
        <form>
            <input type="file" onChange={changeImage}/>
            <div className="errorOutput">
                {/*div placeholder to show on the screen the error message and the file typ being loaded from local state*/}
                {error && <div className="error">{error}</div>}
                {image && <div>{image.name}</div>}
            </div>
        </form>
    )
}

export default UploadImage;

//accessed 19/1/21
//https://www.youtube.com/watch?v=vUe91uOx7R0
//https://www.geeksforgeeks.org/file-uploading-in-react-js/