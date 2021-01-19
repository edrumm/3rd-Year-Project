const admin = require('firebase-admin');

// TODO: Import json or .env to this object
const serviceAcc = {
  
};

// TODO: add URLs
admin.initializeApp({
  credential: admin.credential.cert(serviceAcc),
  databaseURL: '',
  storageBucket: ''
});

const db = admin.firestore();

module.exports.login = () => {

};

module.exports.signup = () => {

};

module.exports.get = () => {

};

module.exports.insert = () => {

};
