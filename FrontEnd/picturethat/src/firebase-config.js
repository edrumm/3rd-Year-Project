/*
Add into firebase.js later

import dotenv from 'dotenv';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

Object.keys(firebaseConfig).forEach(k => {
  if (firebaseConfig[k] === undefined) {
    console.error(".env file is missing");
    process.exit(1);
  }
});

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const storage = firebase.storage();

export default { firestore, storage };
*/
