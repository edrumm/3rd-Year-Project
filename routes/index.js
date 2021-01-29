const express = require('express');
const Router = express.Router();

const session = require('./../scripts/session');
const firebase = require('./../scripts/firebase');
const storage = require('./../scripts/storage');
const schema = require('./../scripts/schema');
const { db, bucket } = require('./../scripts/firebase-auth');

// TODO: set up routes
Router.post('/test', (req, res) => {
  res.json({ test: 'Ok!' });
});


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

Router.get('/session', (req, res) => {

  // ...

});

module.exports = Router;
