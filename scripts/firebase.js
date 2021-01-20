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
module.exports.login = (data, query) => {

  // search db for entry,
  // if exists login is ok

};

// DB signup function
module.exports.signup = (data) => {

  // add new entry to db if not exist

};

// DB fetch
// https://firebase.google.com/docs/firestore/query-data/queries
module.exports.get = (data, collection, query=null) => {

  // get collection

  if (query) {

    // get result with query

  } else {

    // get everything in collection

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
