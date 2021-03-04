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
  Needs tested
*/
module.exports.deleteAccount = async (db, id) => {
  // reference to user
  let ref = await db.collection('users').doc(id);

  // other data
  let user = await ref.get();
  let posts = user.data().posts;
  let comments = await db.collection('comments').where('user', '==', id).get();

  // delete this users' comments
  comments.forEach(comm => {
    module.exports.deleteComment(db, comm.id);
  });


  // foreach user post, delete all comments and post itself
  posts.forEach(post => {
      let postComments = await db.collection('comments').where('post', '==', post.id);

      postComments.forEach((comm => {
        module.exports.deleteComment(db, comm.id);
        module.exports.deletePost(db, post.id);
      });
  });

  // finally, delete account
  await ref.delete();

  return true;
};

module.exports.deletePost = (db, id) => {

  // work in progress
  return false;

};

module.exports.deleteComment = async (db, id) => {

  await db.collection('comments').doc(id).delete();

};
