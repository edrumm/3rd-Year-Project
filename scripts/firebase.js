const hash = require('./hash');

// DB login function
module.exports.login = async (db, data) => {

  let user = await db.collection('users').doc(data.username);
  let doc = await user.get();

  if (!doc.exists) {
    // redirect to login
    return { ok: false, err: 'Couldn\'t find an existing account' };
  }

  // let pw = await hash.match(data.password, doc.data().password) - todo

  if (user.id === data.username && doc.data().password === data.password) {
    return { ok: true, err: null };
  }

  // login unsuccessful

  return { ok: false, err: 'Incorrect password' };
};

// DB signup function
module.exports.signup = async (db, data) => {

  let user = await db.collection('users').doc(data.username);

  if (user.exists) {
    // redirect to login
    return { ok: false, err: 'Account already exists. Log in instead?' };
  }

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

// DB delete
// https://stackoverflow.com/questions/52048204/firestore-delete-document-and-all-documents-referencing-it
module.exports.deleteAccount = async (db, id) => {
  let user = await db.collection('users').doc(id).get();
  let posts = user.data().posts;
  let comments = await db.collection('comments').where('user', '==', 'id').get();

  // work in progress

};

module.exports.deletePost = (db, id) => {

};

module.exports.deleteComment = async (db, id) => {

  await db.collection('comments').delete();

};
