import { firebase, storage, firestore, auth /*, analytics*/} from './Auth';
import React, { useState, useEffect, useContext } from 'react';
import { number } from 'joi';

const context = React.createContext();
const Auth = () => {
  return useContext(context);
};

// let user = null;

const Login = async (email, password) => {

  await auth.signInWithEmailAndPassword(email, password);

};

const Signup = async (email, password, username) => {

  // errors caught on top level
  await auth.createUserWithEmailAndPassword(email, password);


  let user = await firestore.collection('users').doc(email);
  let doc = await user.get();

  if (doc.exists) {
    // redirect to login
    throw new Error('An account with these details exists already');
  }
  let userID = auth.currentUser.uid;

  await firestore.collection('users').doc(userID).set({
    username: username,
    followed_channels: [],
    liked_posts: [],
    posts: [],
    // not yet implemented, will store ID's of unlocked achievements
    achievements: [],
    score: 0
  });

  await auth.currentUser.updateProfile({
    displayName: username,
  });

  console.log('Account created');
}

const Logout = async () => {

  await auth.signOut();

};

/**
 Under construction
 Testing needed
 Needs exporting
 Achievements needs implemented in users collection
 */
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

    return `Earned achievement: ${description}! ${score} score gained!`;
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

});

const getUser = () => {
  let user = auth.currentUser;

  if (user != null) {
    console.log(`user = ${user.displayName}`);
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

const changeUserEmail = (newEmail) => {
  var user = auth.currentUser;
  var newemail = newEmail;
  // var oldEmail = user.email;
  // console.log(oldEmail);

  user.updateEmail(newemail).then(() => {
    // Update successful.
  }).catch(err => {
    console.error(err);
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

// const changeUserProfilePic = (url) => {
//   var user = auth.currentUser;

//   user.updateProfile({
//     photoURL: url
//   }).then(function() {
//     // Update successful.
//   }).catch(function(error) {
//     // An error happened.
//   });
// }

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



  //need to delete db user info and posts
}

const reportPost = async (post, reportReason) => {
  
  const reportref = firestore.collection('reports').doc(post);
  const username = auth.currentUser.displayName;

  reportref.set({
    Post: post,
    Username: username,
    Reason: reportReason
  });

}

const UploadPost = async (caption, loc, channel, image) => {
  const username = auth.currentUser.displayName;

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
    likes: 0,
    reported: false
  };


  await refnewpost.set(Data);

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

}


const AddComment = async (text, post) => {
  const username = auth.currentUser.displayName;
  const refcom = firestore.collection('comments').doc();
  //let postref = firestore.collection('posts').doc(post);
  const Data = {
    uploaddate: firebase.firestore.Timestamp.now().toDate(),
    username: username,
    text: text,
    post: post
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
// const allPosts =  await firestore.collection("users").where("likedPosts", 'array-contains', postref)
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) =>{
//       if(doc == user){
//         already = true;
//         //console.log(already);
//       }
//     })
//     return already;
//   })

//   allPosts.then((result) =>{
//     realvalue = result;
//   })

//   return realvalue;


const LikePost = async (post) => {
  //Uses built in FireBase method for incrementing
  const increment = firebase.firestore.FieldValue.increment(1);
  let postref = firestore.collection("posts").doc(post);
  //on the post side, simply increment the number of likes by one
  postref.update({
    likes: increment
  })

  //on user side, add the post reference to the array within the specific user document
  const user = getUserID();
  let userref = firestore.collection("users").doc(user);
  userref.update({
    likedPosts: firebase.firestore.FieldValue.arrayUnion("/posts/" + post)
  })
}

const UnlikePost = async (post) => {
  //firebase built in method for incrementing, just set with negative value
  const decrement = firebase.firestore.FieldValue.increment(-1);
  //post end just increments in the negative direction - i.e decrementing
  let postref = firestore.collection("posts").doc(post);
  postref.update({
    likes: decrement
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
  let channelref = "/channel/" + channel;
  const user = getUserID();
  //goes through all users and finds ones where this specific post has been liked
  //if any of these users match the one we are currently interested in, return true
  //and if not, return false. WHEN USED IN FRONT END, ONLY CALL LIKEPOST IF THIS RETURNS FALSE

  const allike = await firestore.collection('users')
    .where("likedPosts", 'array-contains', channelref)
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


const FollowChannel = async (channel) => {
  const user = getUserID();
  const userref = firestore.collection('users').doc(user);
  userref.update({
    followed_channels: firebase.firestore.FieldValue.arrayUnion("/channels/" + channel)
  });
  const increment = firebase.firestore.FieldValue.increment(1);

  const channelref = firestore.collection('channels').doc(channel);
  channelref.update({
    number_of_followers: increment
  })

}

const UnFollowChannel = async (channel) => {
  const user = getUserID();
  const userref = firestore.collection('users').doc(user);
  userref.update({
    followed_channels: firebase.firestore.FieldValue.arrayRemove("/channels/" + channel)
  });
  const increment = firebase.firestore.FieldValue.increment(-1);

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
          documents.push({ ...doc.data(), id: doc.id })
        });
        setDocs(documents);
      })

    return () => unsub();
  }, [collection])
  return { docs };
 
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
                  documents.push({...doc.data(), id: doc.id})
          });
          setDocs(documents);
      })

      return () => unsub();
  }, [collection])
  return { docs };
 
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
          //for (let doc of querySnapshot.docs) {
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

  // let allPost = [];
  // const channelpost = firestore.collection('posts').where('channelName', '==', channel);
  // channelpost.get().then(querySnapshot => {
  //   querySnapshot.forEach(documentSnapshot => {
  //     allPost.push({... documentSnapshot.data(), id: documentSnapshot.id});
  //   });
  // });
  // return {allPost};
}


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



  /*let all = await firestore
    .collection("users")
    .doc(user)
    .get()
    .then((doc) =>
      doc.data().followed_channels
    ).then( async (channels) => {
      let posts = [];

      for (let i = 0; i < channels.length; i++) {

        var channel = channels[i].replace("/channels/", "");

        var allposts = await firestore
          .collection("posts")
          .where("channelName", "==", channel)
          .get()
          .then((querySnapshot) => {
            let postsInChannel = [];
            querySnapshot.forEach((doc) => {
              postsInChannel.push({ ...doc.data(), id: doc.id });
            });
            return postsInChannel;
          });
          console.log(allposts);
        posts = posts.concat(allposts);
      }

      return posts;
    }

    );
    console.log(typeof all);
  return { all };*/

};


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
  GetSingleChannel
};

export { Auth, Login, Signup, Logout, AchievementUnlock };


//https://www.youtube.com/watch?v=cFgoSrOui2M
//https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
