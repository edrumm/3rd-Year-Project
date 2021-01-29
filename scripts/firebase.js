// DB login function

//Jake Edit: Changed all mentions of username in in/up to email to match revised database
module.exports.login = async (db, data) => {

  let user = await db.collection('users').doc(data.email);
  let doc = await user.get();

  if (!doc.exists) {
    // redirect to login
    return false;
  }

  if (user.id === data.email && doc.data().password === data.password) {
    // login successful

    return true;
  }

  // login unsuccessful

  return false;
};

// DB signup function
module.exports.signup = async (db, data) => {

  let user = await db.collection('users').doc(data.email);

  if (user.exists) {
    // redirect to login
    return false;
  }

  await db.collection('users').doc(data.email).set({
    email: data.email,
    followed_channels: ['channels/feed'],
    followers: [],
    following: [],
    liked_posts: [],
    password: data.password,
    posts: [],
    score: 0
  });

  return true;
};

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
