const express = require('express');
const Router = express.Router();

const session = require('./../scripts/session');
const firebase = require('./../scripts/firebase');
const storage = require('./../scripts/storage');
const schema = require('./../scripts/schema');
const { db, bucket } = require('./../scripts/firebase-auth');

// Test route
Router.post('/test', (req, res) => {
  res.json({ test: 'Ok!' });
});


// Login route: validate login, send to Firebase
Router.post('/login', (req, res) => {

  try {
    schema.login(req.body);

    firebase.login(db, req.body)
    .then(ok => {
      if (ok){
        res.json({ login: true });
        res.end();
      } else {
        res.json({ login: false });
        res.end();
      }
    });

  } catch (err) {
    res.json({err: err});
  }
});

// Signup route: validate, send to DB
Router.post('/signup', (req, res) => {

  try {
    schema.signup(req.body);

    firebase.signup(db, req.body)
    .then(ok => {
      if (ok) {
        res.json({ signup: true });
        res.end();
      } else {
        res.json({ signup: false });
        res.end();
      }
    });

  } catch (err) {
    res.json({err: err});
  }
});

// TODO
Router.post('/upload', (req, res) => {

  // ...

});

Router.post('/download', (req, res) => {

  // ...

});

Router.post('/logout', (req, res) => {
  session.destroy();

  // ...

});

// Returns the current session info if any
Router.get('/sesison', (req, res) => {

  res.json({ session: session.get() });

});

module.exports = Router;
