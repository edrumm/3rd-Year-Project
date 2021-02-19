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
module.exports.upload = /* async */ (db, bucket, img) => {

};

module.exports.download = /* async */ (db, bucket, url) => {

};
