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
    as login/signup.

    ewan:
    changed function to be async
*/
module.exports.upload = async (data) => {
  const uploadTask = await firebase.ref(`images/${data.name}`).put(data.image);
  const collection = await firebase.collection('posts');
  const userpost = await firebase.collection('users');
  const title = data.title;
  const loc = data.loc;
  const description = data.description;
  error => {
    console.log(error);
  },
  () => {
          storage
              .ref("images")
              .child(data.name)
              .getDownloadURL()
              .then(url => {
                  console.log(url);
                  //return the url as part of data returned
                  const uploaddate = timestamp();
                  collection.add({ url: url, uploaddate, title, loc, description});
              });
      }
  return{ok: true, err: "file not uploaded"};
};

module.exports.download = /* async */ (db, bucket, url) => {

};
