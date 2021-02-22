// https://cloudinary.com/
// https://stackoverflow.com/questions/60922198/firebase-storage-upload-image-file-from-node-js

/*
  Need to figure out how firebase / Google Cloud storage works first
  Figuire out which modules are needed to make sorage work:
    - firebase-admin
    - gcloud ?
    - ?
*/

const firebase = require('./firebase');

/*
  Ewan edit / notes:
  
  Should this function accept a path and then proceed to read the image file using
  fs for example, OR, should it be read client (React) side and just take an image
  as the img parameter??
*/


/*  jake note: Currently modifying Lucas' upload code, tweaking values and will update frontEnd to have similar fetch
    as login/signup. */
module.exports.upload = /* async */ (data, bucket, img) => {
  const uploadTask = firebase.ref(`images/${img.name}`).put(img);
  const collection = firebase.collection('posts');
  uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
          console.log(error);
      },
      () => {
          storage
              .ref("images")
              .child(img.name)
              .getDownloadURL()
              .then(url => { 
                  console.log(url);
                  //return the url as part of data returned
                  const uploaddate = timestamp();
                  collection.add({ url: url, uploaddate, data.title, data.loc, data.description});
              });
      }     
      
};

module.exports.download = /* async */ (db, bucket, url) => {

};
