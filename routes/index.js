// Libs
const express = require('express');
const Router = express.Router();

// Scripts
const firebase = require('./../scripts/firebase');
const storage = require('./../scripts/storage');
const schema = require('./../scripts/schema');
const feed = require('./../scripts/feed');
const { Session } = require('./../scripts/session');
const { db, bucket } = require('./../scripts/firebase-auth');

// Session object
let session = new Session();


/**
  Test route,

  use fetch('/api/test') to check setup
*/
Router.post('/test', (req, res) => {
  res.json({ test: 'Ok!' });
});


/**
  Login Route

  TESTED // WORKING
*/
Router.post('/login', (req, res) => {

  try {
    schema.login(req.body);

    firebase.login(db, req.body)
    .then(response => {

      if (response.ok){
        session.user = req.body.username;
        res.json({ ok: true, err: null });
        res.end();

      } else {
        res.json({ ok: false, err: response.err });
        res.end();
      }
    });

  } catch (err) {
    res.json({ ok: false, err: err });
  }
});

/**
  Signup Route

  TESTED // WORKING
*/
Router.post('/signup', (req, res) => {

  try {
    schema.signup(req.body);

    firebase.signup(db, req.body)
    .then(response => {

      if (response.ok) {
        res.json({ ok: true, err: null });
        res.end();

      } else {
        res.json({ ok: false, err: response.err });
        res.end();
      }
    });

  } catch (err) {
    res.json({ ok: false, err: err });
  }
});


/**
  Fetch / Post

  NOT IMPLEMENTED
*/
Router.get('/get', (req, res) => {



});

Router.post('/post', (req, res) => {



});


/**
  Upload post

  UNTESTED // NEEDS FINISHING
*/
Router.post('/upload', (req, res) => {

  storage.upload(req.body, db)
  .then(uploadOK => {
    if(uploadOK){res.json({ok: true, err: null});
    res.end();}
    else{res.json({ok: false, err: err});
      res.end();}})
  //   firebase.insert(db, data, 'posts')
  //   .catch(err => {
  //     res.json({ok: false, err: err});
  //     res.end();
  //   });

  //   res.json({ok: true, err: null});
  //   res.end();
  // })
  .catch(err => res.json({ok: false, err: err}));
});

/**
  Download post

  UNTESTED // NEEDS FINISHING
*/
Router.post('/download', (req, res) => {

  storage.download(storage, req.url)
  .then(img => {
    const query = {
      field: 'url',
      operand: '==',
      value: req.url
    };

    firebase.get(db, 'posts', query)
    .then(data => {
      res.json({post: data});
      res.end();
    })
    .catch(err => {
      res.json({ok: false, err: err});
      res.end();
    });
  })
  .catch(err => res.json({ok: false, err: err}));

});


/**
  Logout

  TESTED // Working
*/
Router.get('/logout', (req, res) => {

  session.destroy();

});


/**
  Session

  TESTED // Working
*/
Router.get('/session', (req, res) => {

  res.json({ session: session.user });

});

module.exports = Router;
