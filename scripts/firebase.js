/*
 * NOTE: consider moving connection stuff to router and pass as parameter to DB functions
 * Would allow for separate files for firestore and storage?
 *
 * Connect to firebase in routes/index.js, pass admin.firestore() + data to this file
 * and admin.storage() + data to functions in storage.js
 * ?
 */

const admin = require('firebase-admin');

const credentials = {
  type: 'service account',
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
};

// Check that .env file isn't undefined
Object.keys(credentials).forEach(k => {
  if (credentials[k] === undefined) {
    console.error(".env file is missing");
    process.exit(1);
  }
});

// Connect to Firebase
admin.initializeApp({
  credential: admin.credential.cert(credentials),
  storageBucket: process.env.STORAGE_BUCKET
});

const db = admin.firestore();

/*
  UNCOMMENT FOR TEST

  db.collection('users').get()
  .then(res => {
    res.forEach(doc => console.log(doc.data().username));
  })
  .catch(err => console.error(err));
*/


// DB login function
module.exports.login = (data) => {

  // search db for entry,
  // if exists login is ok

};

// DB signup function
module.exports.signup = async (data) => {

  /*
  let user = await db.collection('users').doc(data.username); <- need document reference for this

  if (!user.empty) {

    // account already exists
    // return an err
    return;

  }*/

  let res = await db.collection('users').add({
    email: data.email,
    followed_channels: [],
    followers: [],
    following: [],
    liked_posts: [],
    password: data.password,
    posts: [],
    score: 0,
    username: data.username
  });

  // do something with ID: res.id;
  // ...

};

// DB fetch
// 'query' should have properties for field, an operator, and values(s) to match
module.exports.get = async (collection, query=null) => {

  if (query) {

    let ref = db.collection(collection);
    return await ref.where(query.field, query.operand, query.value).get();

  } else {

    return await db.collection(collection).get(); // .data() ?
  }
};

// DB insert
module.exports.insert = (data, collection) => {

  // add new entry to database
  // is signup() needed ??

};

// DB update
module.exports.update = (data, collection, query) => {

  // set entry to values in data in the collection
  // query might be needed

};

// DB delete
module.exports.delete = (collection, query) => {

  // remove entry

};
