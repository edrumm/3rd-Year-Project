import firebase from 'firebase';
 
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
  const fire = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default fire;

  https://www.youtube.com/watch?v=cFgoSrOui2M