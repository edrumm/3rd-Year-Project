import { firebase, storage, firestore, auth } from './Auth';
import React, { useState, useEffect, useContext } from 'react';
import { number } from 'joi';
import Swal from 'sweetalert2';

// React function, not currently used
const context = React.createContext();
const Auth = () => {
  return useContext(context);
};

// Login, slogout sign up
const Login = async (email, password) => {

  await auth.signInWithEmailAndPassword(email, password);

  let uid = auth.currentUser.uid;
  let user = await firestore.collection('users').doc(uid).get();
  let doc = user.data();

  // update achievements
  if (doc.score >= 100 && doc.score < 500) {
    AchievementUnlock('100-score').catch(err => console.error(err));

  } else if (doc.score >= 500 && doc.score < 1000) {
    AchievementUnlock('500-score').catch(err => console.error(err));

  } else if (doc.score > 1000) {
    AchievementUnlock('1000-score').catch(err => console.error(err));
  }
};

const Signup = async (email, password, username) => {

  await auth.createUserWithEmailAndPassword(email, password);

  let user = await firestore.collection('users').doc(email);
  let doc = await user.get();

  if (doc.exists) {
    Swal.fire({
      icon: 'error',
      title: 'Oops',
      text: 'That account already exists. Did you mean to login instead?'
    });

    throw new Error('An account with these details exists already');
  }
  let userID = auth.currentUser.uid;

  // create new user
  await firestore.collection('users').doc(userID).set({
    username: username,
    followed_channels: [],
    liked_posts: [],
    posts: [],
    achievements: [],
    score: 0,
    num_posts: 0
  });

  await auth.currentUser.updateProfile({
    displayName: username,
  });

  console.log('Account created');
}

const Logout = async () => {

  await auth.signOut();

};

// Achievement system
const AchievementNumPosts = async () => {
  let uid = auth.currentUser.uid;
  let user = await firestore.collection('users').doc(uid).get();

  return user.data().num_posts;
};

// Awards achievement if not unlocked
const AchievementUnlock = async (id) => {
  let username = auth.currentUser.displayName;
  let user = await firestore.collection('users').doc(auth.currentUser.uid).get();

  let achv = user.data().achievements;
  let score = user.data().score;

  if (!achv.includes(id)) {

    let achvDoc = await firestore.collection('achievements').doc(id).get();
    let achvScore = achvDoc.data().score;
    let description = achvDoc.data().description;

    score += achvScore;

    achv.push(id);
    await firestore.collection('users').doc(user.id).update({ achievements: achv, score: score });

    Swal.fire({
      icon: 'info',
      title: 'Achievement Unlocked!',
      text: `${description} - ${achvScore} score gained!`
    });

    return true;
  }

  return false;
};

const forgotPass = (email) => {

  auth.sendPasswordResetEmail(email).then(function () {
    // Email sent.
  }).catch(error => {
    console.log(error);
    // An error happened.
  });
};

// Detects change in login state
auth.onAuthStateChanged(u => {
  // for testing purposes
});

// Returns username, UID
const getUser = () => {
  let user = auth.currentUser;

  if (user != null) {
    return user;
  } else {
    return null;
  }
}

const getUserID = () => {
  let user = auth.currentUser;

  if (user != null) {
    return user.uid;
  }
  else {
    return null;
  }
}
const changeUserPass = (newPass) => {
  var user = auth.currentUser;

  user.updatePassword(newPass).then(() => {
    // Update successful.
  }).catch(err => {
    console.error(err);
  });
}

// Change user info
const changeUserEmail = (newEmail) => {
  var user = auth.currentUser;
  var newemail = newEmail;
  user.updateEmail(newemail).then(() => {
    // Update successful.
  }).catch(err => {
    console.error(err);
  });
}

const changeUserName = (newUserName) => {
  var user = auth.currentUser;
  var Username = auth.currentUser.displayName;

  user.updateProfile({
    displayName: newUserName
  }).then(() => {
    // Update successful.
  }).catch(err => {
    console.error(err);
  });

  const updateUsername = firestore.collection('users').doc(user.uid);
  updateUsername.update({
    username: newUserName
  });

  const postupdate = firestore.collection('posts')
    .where("UserName", "==", Username)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        let updatepost = firestore.collection('posts').doc(documentSnapshot.id)
        updatepost.update({
          UserName: newUserName
        })
      })
    })

  const commmentupdate = firestore.collection('comments')
    .where("username", "==", Username)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        let updatepost = firestore.collection('comments').doc(documentSnapshot.id)
        updatepost.update({
          username: newUserName
        })
      })
    })
}

const deleteUser = () => {
  var userdelete = auth.currentUser;
  var deletedid = auth.currentUser.uid;
  var username = auth.currentUser.displayName;
  firestore.collection('users').doc(deletedid).delete();
  const postupdate = firestore.collection('posts')
    .where("UserName", "==", username)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        let updatepost = firestore.collection('posts').doc(documentSnapshot.id)
        updatepost.update({
          UserName: "[Deleted User]"
        })
      })
    })

  const commmentupdate = firestore.collection('comments')
    .where("username", "==", username)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        let updatepost = firestore.collection('comments').doc(documentSnapshot.id)
        updatepost.update({
          username: "[Deleted User]"
        })
      })
    })

  userdelete.delete().then(() => {
    //console.log("Successfully deleted user");
  }).catch(error => {
    //console.log("Error deleting user:", error);
  });

}

const reportPost = async (post, reportReason) => {

  const reportref = firestore.collection('reports').doc();
  const username = auth.currentUser.displayName;

  reportref.set({
    Post: post,
    Reported_by: username,
    Reason: reportReason
  });

}

const UploadPost = async (caption, loc, channel, image) => {
  const username = auth.currentUser.displayName;
  const user = getUserID();
  console.log(caption);
  console.log(loc);
  console.log(channel);
  const url = await storage.ref(`images/${image.name}`).put(image).then((snapshot) => {
    return snapshot.ref.getDownloadURL();
  });

  const increment = firebase.firestore.FieldValue.increment(1);
  const refnewpost = firestore.collection('posts').doc();
  const refchannel = firestore.collection('channels').doc(channel);
  const userref = firestore.collection('users').doc(username);

  const Data = {
    uploaddate: firebase.firestore.Timestamp.now().toDate(),
    UserName: username,
    caption: caption,
    location: loc,
    channel: refchannel,
    channelName: channel,
    url: url,
    likes: 0,
    reported: false
  };


  await refnewpost.set(Data);
  let np = await AchievementNumPosts();

  if (np == 1 || np == 10 || np == 50) {
    AchievementUnlock(`${np}-photos`)
    .catch(err => {
      throw err;
    });
  }


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
          number_of_posts: 1,
          number_of_followers: 0
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
  const usernumpost = firestore.collection('users').doc(user);
  usernumpost.update({
    num_posts: increment
  })
}

const DeletePost = async (id) => {
  let uid = auth.currentUser.uid;
  let user = await firestore.collection('users').doc(uid).get();
  let post = await firestore.collection('posts').doc(id).get();
  let comments = await firestore.colleciton('comments').where('post', '==', id).get();

  let channelName = post.data().channel;
  channelName = channelName.replace('/channels/', '');
  let channel = await firestore.collection('channels').doc(channelName).get();

  let storageRef = await storage.refFromURL(post.data().url);

  await storageRef.delete();
  await post.update({ url: 'deleted' });

  comments.forEach(async comm => {
    await firestore.collection('comments').doc(comm.id).delete();
  });
};


const TotalScore = async () =>{
  const user = auth.currentUser.displayName;
  let score = 0;

  const postrefs = await firestore.collection('posts')
  .where("UserName", "==", user)
  .get()
  .then(snapshot=>{
    snapshot.forEach(doc =>{
      score = score + doc.data().likes;
    })
  })

  console.log(score);
  return score;
}


const AddComment = async (text, post) => {
  const username = auth.currentUser.displayName;
  const refcom = firestore.collection('comments').doc();
  const Data = {
    uploaddate: firebase.firestore.Timestamp.now().toDate(),
    username: username,
    text: text,
    post: post
  }
  await refcom.set(Data);


  AchievementUnlock('comment')
  .catch(err => {
    throw err;
  });
}

// Functions with JSX syntax to send data to front end
const GetComments = (postid) => {
  const [docs, setDocs] = useState([]);
  let postref = postid;

  useEffect(() => {
    const unsub = firestore.collection('comments')
      .where('post', '==', postref)
      .orderBy('uploaddate', 'desc')
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id })
        });
        setDocs(documents);
      })

    return () => unsub();
  }, ['comments'])

  return docs;
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

const UsernameTaken = async (username) => {
  let found = false;


  const usertaken = await firestore.collection('users')
    .where('username', '==', username)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        found = true;
      });
    })
  return found;
}
//Should work, but might need some tweaking depending on how specific values are returned
const AlreadyLiked = async (post) => {
  let found = false;
  let postref = "/posts/" + post;
  const user = getUserID();
  //goes through all users and finds ones where this specific post has been liked
  //if any of these users match the one we are currently interested in, return true
  //and if not, return false. WHEN USED IN FRONT END, ONLY CALL LIKEPOST IF THIS RETURNS FALSE

  const allike = await firestore.collection('users')
    .where("likedPosts", 'array-contains', postref)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let test = doc.id;
        if (user == test) {
          found = true
        }
        else {
          found = false;
        }
      });
    })
  return found;
}

const LikePost = async (post) => {
  //Uses built in Firebase method for incrementing
  const increment = firebase.firestore.FieldValue.increment(1);
  let postref = firestore.collection("posts").doc(post);
  //on the post side, simply increment the number of likes by one
  postref.update({
    likes: increment
  })
  let total = (await postref.get()).data();
  await firestore.collection('users')
  .where("username", "==", total.UserName)
  .get()
  .then(snapshot =>{
    snapshot.forEach(doc =>{
      const test = firestore.collection("users").doc(doc.id);
      test.update({
        score: increment
      })
    })
  })
  //on user side, add the post reference to the array within the specific user document
  const user = getUserID();
  let userref = firestore.collection("users").doc(user);
  userref.update({
    likedPosts: firebase.firestore.FieldValue.arrayUnion("/posts/" + post)
  });

  AchievementUnlock('liked-post')
  .catch(err => console.error(err));
}

const UnlikePost = async (post) => {
  //firebase built in method for incrementing, just set with negative value
  const decrement = firebase.firestore.FieldValue.increment(-1);
  //post end just increments in the negative direction - i.e decrementing
  let postref = firestore.collection("posts").doc(post);
  postref.update({
    likes: decrement
  })

  let total = (await postref.get()).data();
  await firestore.collection('users')
  .where("username", "==", total.UserName)
  .get()
  .then(snapshot =>{
    snapshot.forEach(doc =>{
      const test = firestore.collection("users").doc(doc.id);
      test.update({
        score: decrement
      })
    })
  })
  const user = getUserID();
  //user end uses opposite array method from UNION to remove the specific post from the array
  let userref = firestore.collection("users").doc(user);
  userref.update({
    likedPosts: firebase.firestore.FieldValue.arrayRemove("/posts/" + post)
  })
}


const AlreadyFollowed = async (channel) => {
  let found = false;
  let channelref = "/channels/" + channel;
  const user = getUserID();
  //goes through all users and finds ones where this specific channel has been followed
  //if any of these users match the one we are currently interested in, return true
  //and if not, return false. WHEN USED IN FRONT END, ONLY CALL FOLLOWCHANNEL IF THIS RETURNS FALSE

  const allike = await firestore.collection('users')
    .where("followed_channels", 'array-contains', channelref)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let test = doc.id;
        if (user == test) {
          found = true
        }
        else {
          found = false;
        }
      });
    })
  return found;
}

const getScore = async() =>{
  const user = getUserID();
  const score = firestore.collection('users').doc(user)
  let total = 0;
  await score.get()
  .then(doc =>{
    total = doc.data().score;
  })
  console.log(total);
  return total;
}
const FollowChannel = async (channel) => {
  //gets the specific user document and adds the channel path to their array
  //of followed channels
  const user = getUserID();
  const userref = firestore.collection('users').doc(user);
  userref.update({
    followed_channels: firebase.firestore.FieldValue.arrayUnion("/channels/" + channel)
  });

  //built in firebase increment function
  const increment = firebase.firestore.FieldValue.increment(1);

  //updates the number_of_followers by one
  const channelref = firestore.collection('channels').doc(channel);
  channelref.update({
    number_of_followers: increment
  });

  AchievementUnlock('followed-channel')
  .catch(err => {
    throw err;
  });
}

const UnFollowChannel = async (channel) => {
  //oppoisite of Follow, finds specific user, and removes channel path from their
  //followed channel array
  const user = getUserID();
  const userref = firestore.collection('users').doc(user);
  userref.update({
    followed_channels: firebase.firestore.FieldValue.arrayRemove("/channels/" + channel)
  });

  //built in firebase increment function, increments by parameter so negative fine
  const increment = firebase.firestore.FieldValue.increment(-1);

  //update the number of followers a channel has
  const channelref = firestore.collection('channels').doc(channel);
  channelref.update({
    number_of_followers: increment
  })

}

const GetPostofUser = () => {

  const [docs, setDocs] = useState([]);
  const username = auth.currentUser.displayName;

  useEffect(() => {
    const unsub = firestore.collection('posts')
      .where('UserName', '==', username)
      .orderBy('uploaddate', 'desc')
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id })
        });
        setDocs(documents);
      })

    return () => unsub();
  }, ['posts'])

  return { docs };
}

const GetImg = (collection) => {

  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = firestore.collection(collection)
      .orderBy('uploaddate', 'desc')
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id})
        });
        setDocs(documents);
      })

    return () => unsub();
  }, [collection])
  return docs;

}

const GetTopPosts = (collection) => {

  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = firestore.collection(collection)
      .orderBy('likes', 'desc')
      .limit(10)
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

const GetLikes = (post) => {
  var docRef = firestore.collection("posts").doc(post);
  const [docs, setDocs] = useState([]);

  docRef.get().then((doc) => {
    if (doc.exists) {
      setDocs(doc.data())
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
  return docs;
}

const GetUserStats = () => {
  let user = getUserID();
  var docRef = firestore.collection("users").doc(user);
  const [docs, setDocs] = useState([]);
  let isMounted = true;

  docRef.get().then((doc) => {
    if (doc.exists) {
      if (isMounted === true ) {
        //for (let doc of querySnapshot.docs) {
        setDocs(doc.data())
        isMounted = false;
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
  return docs;
}

const GetChannelInfo = (channel) => {
  var docRef = firestore.collection("channels").doc(channel);
  const [docs, setDocs] = useState([]);

  docRef.get().then((doc) => {
    if (doc.exists) {
      setDocs({...doc.data(), id: doc.id })
    } else {
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
  return docs;
}

const GetSinglePost = (id) => {

  const [docs, setDocs] = useState([]);
  let isMounted = true;
  useEffect(() => {
    firestore
      .collection('posts').doc(id)
      .get()
      .then((doc) => {
        if (isMounted) {
          setDocs({ ...doc.data(), id: doc.id })
        }
      });
    return () => { isMounted = false };
  }, [])

  return docs;



}

const GetSingleChannel = (channel) => {

  const [docs, setDocs] = useState([]);
  let isMounted = true;
  useEffect(() => {
    firestore
      .collection('channels').doc(channel)
      .get()
      .then((doc) => {
        if (isMounted) {
          setDocs({ ...doc.data(), id: doc.id })
        }
      });
    return () => { isMounted = false };
  }, [])

  return docs;


}

const GetPostofChannels = (channel) => {

  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = firestore.collection('posts')
      .where('channelName', '==', channel)
      .orderBy('uploaddate', 'desc')
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id })
        });
        setDocs(documents);
      })

    return () => unsub();
  }, ['posts'])

  return { docs };
}

// Returns all posts data for channels this user follows
const GetAllUserChannelPosts = async () => {
  const user = getUserID();

  let posts = [];
  let all = await firestore.collection('users').doc(user).get();
  let channels = all.data().followed_channels;

  for (let i = 0; i < channels.length; i++) {
    channels[i] = channels[i].replace('/channels/', '');
  }

  channels.forEach(async chan => {

    let allPosts = await firestore.collection('posts').where('channelName', '==', chan).get();

    allPosts.forEach(post => {
        posts.push({ ...post.data(), id: post.id })
    });
  });

  return posts;
}

/*
  default named exports
  eg:
    import UploadPost from './firebase';
  or all:
    import firebase from './firebase';
*/
export default {
  UploadPost,
  GetData,
  GetImg,
  AddComment,
  GetSinglePost,
  GetPostofChannels,
  LikePost,
  UnlikePost,
  AlreadyLiked,
  getUser,
  forgotPass,
  changeUserPass,
  deleteUser,
  changeUserEmail,
  changeUserName,
  FollowChannel,
  UnFollowChannel,
  GetComments,
  getUserID,
  GetAllUserChannelPosts,
  GetPostofUser,
  AlreadyFollowed,
  UsernameTaken,
  reportPost,
  GetTopPosts,
  GetSingleChannel,
  GetLikes,
  GetChannelInfo,
  TotalScore,
  GetUserStats
};

/*
  standard exports to avoid reloading of file and accidental sign out
  these must be imported seperately

  eg:
    import { Login, Logout } from './firebase';
*/
export { Auth, Login, Signup, Logout, AchievementUnlock, AchievementNumPosts };
