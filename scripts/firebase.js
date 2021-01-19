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

console.log('Connected to firebase');
const db = admin.firestore();

db.collection('users').get()
  .then(data => {
    data.forEach(doc => {
      console.log(`${doc.id} => ${doc.data().username}`);
    });
  })
  .catch(err => console.error(err));

module.exports.login = () => {

};

module.exports.signup = () => {

};

module.exports.get = () => {

};

module.exports.insert = () => {

};
