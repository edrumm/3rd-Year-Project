const hash = require('./hash');

// DB login function
module.exports.login = async (db, data) => {

  // let user = await db.collection('users').doc(data.email);
  let user = await db.collection('users').doc(data.username);
  let doc = await user.get();

  if (!doc.exists) {
    // redirect to login
    return { ok: false, err: 'Couldn\'t find an existing account' };
  }

  // let pw = await hash.match(data.password, doc.data().password) - todo

  if (user.id === data.username && doc.data().password === data.password) {
    return { ok: true, user: data.username, err: null };
  }

  // login unsuccessful

  return { ok: false, err: 'Incorrect password' };
};

// DB signup function
module.exports.signup = async (db, data) => {

  // let user = await db.collection('users').doc(data.email);
  let user = await db.collection('users').doc(data.username);
  let doc = await user.get();

  if (doc.exists) {
    // redirect to login
    return { ok: false, err: 'Account already exists. Log in instead?' };
  }

  // await db.collection('users').doc(data.email).set({
  await db.collection('users').doc(data.username).set({
    email: data.email,
    followed_channels: ['channels/feed'],
    followers: [],
    following: [],
    liked_posts: [],
    password: data.password,
    posts: [],
    score: 0
  });

  return { ok: true, err: null };
};

// TODO: Refactor return values to match something similar to login / signup ?

// DB fetch
// 'query' should have properties for field, an operator, and values(s) to match
module.exports.get = async (db, collection, query=null) => {

  if (query) {

    let ref = db.collection(collection);
    return await ref.where(query.field, query.operand, query.value).get();

  } else {

    return await db.collection(collection).get(); // .data() ?
  }
};

// DB insert
module.exports.insert = async (db, data, collection) => {

  await db.collection(collection).add(data);

};

// DB update
module.exports.update = async (db, data, id, collection) => {

  await db.collection(collection).doc(id).update(data);

};

/* DB delete
  https://stackoverflow.com/questions/52048204/firestore-delete-document-and-all-documents-referencing-it

  Ewan note:
  This will be REALLY complicated. Will have to implement recursive delete.
  - Store user to be deleted
  - Delete all comments and child comments of parent comments from the user
  - Iterate all users' posts, deleting all comments followed by the post itself
  - All accounts / channels this user follows will have to be automatically unfollowed 
    (wipe followed_accounts etc...)
  - Likewise, for users that follow this account, all followers of this account
    will have to automatically unfollow it
  - Finally, remove the entry of this user from firebase
*/
module.exports.deleteAccount = async (db, id) => {
  let user = await db.collection('users').doc(id).get();
  let posts = user.data().posts;
  let comments = await db.collection('comments').where('user', '==', 'id').get();

  // work in progress
  return false;
};

module.exports.deletePost = (db, id) => {

  // work in progress
  return false;

};

module.exports.createComment = async (db, data) => {

  //await db.collection('comments').add({data.text, data.test, data.test2, 0, 0});
  //let user = await db.collection('users').doc(data.user).get();
  //user.update({
    //comments: firebase.firestore.FieldValue.arrayUnion(db.collection('comments').where("....."))
//});

};

module.exports.deleteComment = async (db, id) => {

  await db.collection('comments').doc(id).delete();

};
