const express = require('express');
const bcrypt = require('bcrypt');
const Router = express.Router();

const session = require('./../scripts/session');
const firebase = require('./../scripts/firebase');
const storage = require('./../scripts/storage');
const schema = require('./../scripts/schema');
const { db, bucket } = require('./../scripts/firebase-auth');

// HASHING
async function hash(pw) {
  let salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(pw, salt);
}


async function match(pw, hash) {

  return await bcrypt.compare(pw, hash);

}

// ROUTES
// Test route
Router.post('/test', (req, res) => {
  res.json({ test: 'Ok!' });
});


/*
  Login route: validate login, send to Firebase

  Could try and implement ES6 {} notation to get values from firebase.login:
  const { ok, err } = firebase.login(...)

  Not sure how this would work with .then() though ?
*/
Router.post('/login', (req, res) => {

  try {
    schema.login(req.body);

    firebase.login(db, req.body)
    .then(response => {
      if (response.ok){
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

// Signup route: validate, send to DB
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

// TODO
Router.post('/upload', (req, res) => {

  // ...

});

Router.post('/download', (req, res) => {

  // ...

});

Router.get('/logout', (req, res) => {
  session.destroy();

  // ...

});

// Returns the current session info if any
Router.get('/sesison', (req, res) => {

  res.json({ session: session.get() });

});

module.exports = Router;
