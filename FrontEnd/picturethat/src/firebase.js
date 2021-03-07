import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';
import { useState, useEffect } from 'react';
//import { ref } from 'joi';

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


const UploadPost = async (title, loc, channel, image) => {
  const url = await storage.ref(`images/${image.name}`).put(image).then((snapshot) => {
    return snapshot.ref.getDownloadURL();
  })
  
  const refnewpost = firedatabase.collection('posts').doc();
  const refchannel = firedatabase.doc('channel/'+channel);
  if((await refchannel.get()).exists){

  }

  const Data = {
    caption: title,
    location: loc,
    channel: refchannel,
    url: url
  }


  await refnewpost.set(Data);
  console.log(Data);
}

const GetData = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
      const unsub = firedatabase.collection(collection)
          .onSnapshot((snap) => {
              let documents = [];
              snap.forEach(doc => {
                  documents.push({...doc.data(), id: doc.id})
          });
          setDocs(documents);
      })

      return () => unsub();
  }, [collection])

  return { docs };
}

const GetImg = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
      const unsub = firedatabase.collection(collection)
          .orderBy('uploaddate', 'desc')
          .onSnapshot((snap) => {
              let documents = [];
              snap.forEach(doc => {
                  documents.push({...doc.data(), id: doc.id})
          });
          setDocs(documents);
      })

      return () => unsub();
  }, [collection])

  return { docs };
}

export default  {UploadPost, GetData, GetImg };


//https://www.youtube.com/watch?v=cFgoSrOui2M