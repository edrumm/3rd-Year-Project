// will move authentication to firebase-auth.js
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

// DB login function
module.exports.login = async (data) => {

  let user = await db.collection('users').doc(data.username);
  let doc = await user.get();

  if (!doc.exists) {
    // redirect to login
    return false;
  }

  if (user.id === data.username && doc.data().password === data.password) {
    // login successful

    return true;
  }

  // login unsuccessful

};

// DB signup function
module.exports.signup = async (data) => {

  let user = await db.collection(users).doc(data.username);

  if (user.exists) {
    // redirect to login
    return false;
  }

  await db.collection('users').doc(data.username).set({
    email: data.email,
    followed_channels: [],
    followers: [],
    following: [],
    liked_posts: [],
    password: data.password,
    posts: [],
    score: 0
  });

  return true;
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
module.exports.insert = async (data, collection) => {

  await db.collection(collection).add(data);

};

// DB update
module.exports.update = async (data, id, collection) => {

  await db.collection(collection).doc(id).update(data);

};

// DB delete
// https://stackoverflow.com/questions/52048204/firestore-delete-document-and-all-documents-referencing-it
module.exports.deleteAccount = async (id) => {
  let user = await db.collection('users').doc(id).get();
  let posts = user.data().posts;
  let comments = await db.collection('comments').where('user', '==', 'id').get();

  // work in progress

};

module.exports.deletePost = (id) => {

};

module.exports.deleteComment = async (id) => {

  await db.collection('comments').delete();

};
