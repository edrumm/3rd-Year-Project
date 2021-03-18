import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';
import { useState, useEffect } from 'react';
import { number } from 'joi';
//import { ref } from 'joi';

// PictureThat Firebase configuration
const firebaseConfig = {
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

const storage = firebase.storage();
const firestore = firebase.firestore();
const auth = firebase.auth();

// let user = null;

const login = async (email, password) => {

  await auth.signInWithEmailAndPassword(email, password);

};

const signup = async (email, password, username) => {
  // joi validate

  // errors caught on top level
  await auth.createUserWithEmailAndPassword(email, password);


  let user = await firestore.collection('users').doc(email);
  let doc = await user.get();

  if (doc.exists) {
    // redirect to login
    throw new Error('An account with these details exists already');
  }
  let userID = auth.currentUser.uid;
  // await db.collection('users').doc(data.email).set({
  await firestore.collection('users').doc(userID).set({
    username: username,
    followed_channels: ['channels/feed'],
    liked_posts: [],
    posts: [],
    score: 0
  });



  auth.currentUser.updateProfile({
    displayName: username,
    //photoUrl = photoURL
  }).then(() => {
    // Update successful.
  }).catch(err => {
    console.error(err);
  });

    // ...

    console.log('Account created');

    // ...

  // add account to db
}

const logout = async () => {

  await auth.signOut();

};

const ResetEmail = (email) => {
  var emailAddress = email;

  auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
    }).catch(function(error) {
      console.log(error);
    // An error happened.
    });
};

// Detects change in login state
auth.onAuthStateChanged(user => {



});

const getUser = () => {
  let user = auth.currentUser;

  if (user != null) {
    return user;
  } else {
    return null;
  }
}

const changeUserPass = (newPass) => {
  var user = auth.currentUser;
  var newPassword = newPass;

  user.updatePassword(newPassword).then(function() {
    // Update successful.
  }).catch(function(error) {
    // An error happened.
  });
}

const changeUserEmail = (newEmail) => {
  var user = auth.currentUser;
  // var oldEmail = user.email;
  // console.log(oldEmail);

  user.updateEmail(newEmail).then(function() {
    // Update successful.
  }).catch(function(error) {
    // An error happened.
  });

  // const updateEmail = firestore.collection('users').doc(oldEmail)
  // .get()
  // .then((doc) => {
  //   let data = doc.data();
  //   firestore.collection('users').doc(newEmail).set(data).then(() => {
  //     firestore.collection('users').doc(oldEmail).delete();
  //   });
  // });
  // const updateEmailAdress = firestore.collection('users').doc(oldEmail);
  // updateEmailAdress.update({
  //   email: newEmail
  // });
}

const changeUserName = (newUserName) => {
  var user = auth.currentUser;

  user.updateProfile({
    displayName: newUserName
  }).then(function() {
    // Update successful.
  }).catch(function(error) {
    // An error happened.
  });
}

const changeUserProfilePic = (url) => {
  var user = auth.currentUser;

  user.updateProfile({
    photoURL: url
  }).then(function() {
    // Update successful.
  }).catch(function(error) {
    // An error happened.
  });
}

const deleteUser = () => {
  var user = firebase.auth().currentUser;

  user.delete().then(function() {
    // User deleted.
  }).catch(function(error) {
    // An error happened.
  });

  //need to delete db user info and posts
}

const UploadPost = async (caption, loc, channel, image, username) => {
  const url = await storage.ref(`images/${image.name}`).put(image).then((snapshot) => {
    return snapshot.ref.getDownloadURL();
  });

  const increment = firebase.firestore.FieldValue.increment(1);
  const refnewpost = firestore.collection('posts').doc();
  const refchannel = firestore.collection('channels').doc(channel);
  const userref = firestore.collection('users').doc(username);
  //const timestamp = firebase.firestore.FieldValue.timestamp();

  const Data = {
    uploaddate: firebase.firestore.Timestamp.now().toDate(),
    UserName: username,
    caption: caption,
    location: loc,
    channel: refchannel,
    channelName: channel,
    url: url,
    //comments: [],
    likes: 0
  };


  await refnewpost.set(Data);
  console.log(Data);

  //if/else statement that either adds a post to a channel or creates a new channel and adds that post to it
  if ((await refchannel.get()).exists) {

    //creates a query object of single item array. Goes through each item and updates specific channel field
    //by using reference to document obtained by the
    let query = firestore.collection('posts').where('url', '==', url);
    let newpostref;
    query.get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        newpostref = documentSnapshot.ref;
        refchannel.update({
          //updates the posts array inside the channel document with the post with the matching url
          posts: firebase.firestore.FieldValue.arrayUnion(newpostref),
          //increments the number of posts a given channel has by 1
          number_of_posts: increment
        });
      });
    });
  }
  else {
    let query = firestore.collection('posts').where('url', '==', url);
    let newpostref;
    query.get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        newpostref = documentSnapshot.ref;
        refchannel.set({
          //creates the array that will contain the references to all the posts
          posts: firebase.firestore.FieldValue.arrayUnion(newpostref),
          //sets the number of posts a channel has to one, where it can be incremented
          number_of_posts: 1
        });
      });
    });
  }
  let query = firestore.collection('posts').where('url', '==', url);
  let newpostref;
  query.get().then(querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {
      newpostref = documentSnapshot.ref;
      userref.update({
        //updates the posts array inside the user document with the post with the matching url
        posts: firebase.firestore.FieldValue.arrayUnion(newpostref),
      });
    });
  });

}


const AddComment = async (username, text, post) => {

  const refcom = firestore.collection('comments');
  let postref = firestore.collection('posts').doc(post);
  const Data = {
    username: username,
    text: text,
    post: postref
  }
  await refcom.set(Data);

  //For Use if Users should retain mention of all their comments
  // const userref = firestore.collection('users').doc(username);
  // let query = firestore.collection('comments').where("username", '==', username);
  // query.get().then(querySnapshot => {
  //   querySnapshot.forEach(documentSnapshot => {
  //     newuserref = documentSnapshot.ref;
  //     userref.update({
  //       //creates the array that will contain the references to all the comments
  //       comments: firebase.firestore.FieldValue.arrayUnion(newuserref),
  //     });
  //   });
  // });

}

const GetData = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = firestore.collection(collection)
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id })
        });
        setDocs(documents);
      })

    return () => unsub();
  }, [collection])

  return { docs };
}


//Should work, but might need some tweaking depending on how specific values are returned
const AlreadyLiked = async (post, user) => {
  let already = false;
  let postref = "/post/" + post;

  //goes through all users and finds ones where this specific post has been liked
  //if any of these users match the one we are currently interested in, return true
  //and if not, return false. WHEN USED IN FRONT END, ONLY CALL LIKEPOST IF THIS RETURNS FALSE
  const allPosts = firestore.collection("users").where("likedPosts", 'array-contains', postref)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) =>{
        if(doc == user){
          already = true;
          return already;
        }
      })
    })
    return already;
}

const LikePost = async (post, user) => {
  //Uses built in FireBase method for incrementing
  const increment = firebase.firestore.FieldValue.increment(1);
  let postref = firestore.collection("posts").doc(post);
  //on the post side, simply increment the number of likes by one
  postref.update({
    likes: increment
  })

  //on user side, add the post reference to the array within the specific user document
  let userref = firestore.collection("users").doc(user);
  userref.update({
    likedPosts: firebase.firestore.FieldValue.arrayUnion("/posts/" + post)
  })
}

const UnlikePost = async (post, user) => {
  //firebase built in method for incrementing, just set with negative value
  const decrement = firebase.firestore.FieldValue.increment(-1);

  //post end just increments in the negative direction - i.e decrementing
  let postref = firestore.collection("posts").doc(post);
  postref.update({
    likes: decrement
  })

  //user end uses opposite array method from UNION to remove the specific post from the array
  let userref = firestore.collection("users").doc(user);
  userref.update({
    likedPosts: firebase.firestore.FieldValue.arrayRemove("/posts/" + post)
  })
}

const GetImg = (collection) => {
  // let docs = [];

  // firestore
  //   .collection(collection)
  //   .orderBy('uploaddate', 'desc')
  //   .get()
  //   .then( (querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       //for (let doc of querySnapshot.docs) {
  //         docs.push({...doc.data(), id: doc.id})
  //       });
  //   })
  //   .catch((error) => {
  //       console.log(error)
  //       throw Error('unexpected error when getting all posts')
  //   })
  //   //console.log(docs);
  //   return docs;
  const [docs, setDocs] = useState([]);

  useEffect(() => {
      const unsub = firestore.collection(collection)
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
  // const [blogs,setBlogs]=useState([])
  // const fetchBlogs=async()=>{
  //   const response= firestore.collection(collection);
  //   const data=await response.get();
  //   data.docs.forEach(item=>{
  //    setBlogs([...blogs,item.data()])
  //   })
  // }
  // useEffect(() => {
  //   fetchBlogs();
  // }, [])

  // return blogs;
}

const GetSinglePost = (id) => {


  // var docRef = firestore.collection("posts").doc(id);
  // const [singlePost, setSinglePost] = useState('');

  // docRef.get().then((doc) => {
  //     if (doc.exists) {
  //         setSinglePost(doc.data());
  //     } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //     }
  // }).catch((error) => {
  //     console.log("Error getting document:", error);
  // });

  // return singlePost;

  const [docs, setDocs] = useState([]);
  let isMounted = true;
  useEffect(() => {
  firestore
    .collection('posts').doc(id)
    .get()
    .then( (doc) => {
       if (isMounted){
        //for (let doc of querySnapshot.docs) {
          setDocs({...doc.data(), id: doc.id})
        }
        });
        return () => { isMounted = false};
      }, [])



    //console.log(docs);
    return docs;


}

const GetPostofChannels = (channel) => {

  // const posts = [];
  // posts = firestore.collection('channels').doc(id);
  // return posts;

  // let query = firestore.collection('channels').doc(id);

  //let allPosts = firestore.collection('posts');

  // FOR ALL IN query.postArray {

    //allposts.doc(query.postArray).data()
    //allposts.doc(query.postArray).id Or equivalentm, to match get img
    //push these to an array, then do the same from there as in get img

  //}
  // let newpostref;
  // query.get().then(querySnapshot => {
  //   querySnapshot.forEach(documentSnapshot => {
  //     newpostref = documentSnapshot.ref;
  //     refchannel.set({
  //       //updates the posts array inside the channel document with the post with the matching url
  //       posts: firebase.firestore.FieldValue.arrayUnion(newpostref),
  //       //increments the number of posts a given channel has by 1
  //       number_of_posts: 1
  //     });
  //   });
  // });
  let allPost = [];
  const channelpost = firestore.collection('posts').where('channel', '==', channel);
  channelpost.get().then(querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {
      allPost.push({... documentSnapshot.data(), id: documentSnapshot.id});
    });
  });

}




export default {
  UploadPost,
  GetData,
  GetImg,
  AddComment,
  login,
  logout,
  signup,
  GetSinglePost,
  GetPostofChannels,
  LikePost,
  UnlikePost,
  AlreadyLiked,
  getUser,
  ResetEmail,
  changeUserPass,
  deleteUser,
  changeUserEmail,
  changeUserName,
  changeUserProfilePic
};


//https://www.youtube.com/watch?v=cFgoSrOui2M
//https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
