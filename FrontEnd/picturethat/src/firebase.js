import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';
import { ref } from 'joi';

// PictureThat Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCBVN9q8Dyb-jkn-tTBE6roFpImLrf3wyo",
  authDomain: "picture-that-y3.firebaseapp.com",
  projectId: "picture-that-y3",
  storageBucket: "picture-that-y3.appspot.com",
  messagingSenderId: "971709327177",
  appId: "1:971709327177:web:555305dfeed34241829c98",
  measurementId: "G-JS9RB6QVSJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
const storage = firebase.storage();
const firedatabase = firebase.firestore();


const uploadPost = async (title, loc, channel, image) => {
  const uploadTask = storage.ref(`images/${image.name}`).put(image);
  const url = await uploadTask.getDownloadURL();
  const refnewpost = firedatabase.collection('posts').doc();

  const Data = {
    caption: title,
    location: loc,
    channel: channel,
    url: url
  }


  await refnewpost.set(Data);
  console.log(Data);
}

export { storage, firedatabase, uploadPost, firebase as default };


//https://www.youtube.com/watch?v=cFgoSrOui2M