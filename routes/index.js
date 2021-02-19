const express = require('express');
const Router = express.Router();

const { Session } = require('./../scripts/session');
const firebase = require('./../scripts/firebase');
const storage = require('./../scripts/storage');
const schema = require('./../scripts/schema');
const { db, bucket } = require('./../scripts/firebase-auth');

// Session object
let session = new Session();

// ROUTES
// Test ONLY, ping this route to test setup, should return 'Ok!'
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

/*
  Ewan edit:
  Started thinking about thjese, shouldn't be too much of an issue
  Commented the code out just now as it will cause an error if called -
  as they don't have any async code yet
  General idea though: storage.upload returns a Promise with an error or
  success message
 */
Router.post('/upload', (req, res) => {

  /*

  storage.upload(db, bucket, req.img)
  .then(response => {
    if (response.ok) {
      res.json({ ok: true, err: null });
      res.end();

    } else {
      res.json({ ok: false, err: response.err });
      res.end();
    }
  })
  .catch(err => res.json(ok: false, err: err));

  */

});

Router.post('/download', (req, res) => {

  /*

  storage.download(bucket, req.url)
  .then()
  .catch(err => res.json(ok: false, err: err));

  */

});

Router.get('/logout', (req, res) => {

  session.destroy();

  // Anything else?
  // ...

});

// Returns the current session info if any
Router.get('/session', (req, res) => {

  res.json({ session: session.user });

});

module.exports = Router;
