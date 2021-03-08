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
const { db } = require('./firebase-auth');

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
module.exports.upload = async (data, db) => {
  // const collection = await db.collection('posts');
  // const user = await db.collection('users').doc(data.user).get();
  // const channeldb = await db.collection('channels').doc(data.channel).get();
  //const storage = db.storage();
  const caption = data.caption;
  const loc = data.loc;
  const channel = data.channel;
  const uploaddate = timestamp();
  // const newdata = {
  //     channel: channel,
  //     caption: caption,
  //     loc: loc,
  //     uploaddate: uploaddate
  // }
  //const url = data.nowurl;
         // console.log(url);
          //return the url as part of data returned
          //const uploaddate = timestamp();
          //collection.add({ /*url: url,*/ uploaddate, caption, loc, channel });
          // user.update({
          // posts: firebase.firestore.FieldValue.arrayUnion(db.collection('posts').where("url", "==", url))
          // });
          await db.collection('posts').doc("Big Test").set({
            caption : caption,
            loc: loc,
            uploaddate: uploaddate,
            channel: channel
          })
          .catch(error => {console.error(error)})
  return true;
};

module.exports.download = /* async */ (db, bucket, url) => {

};
