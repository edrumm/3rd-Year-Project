const express = require('express');
const Router = express.Router();

const firebase = require('./../scripts/firebase');
const storage = require('./../scripts/storage');
const schema = require('./../scripts/schema');

// TODO: set up routes
Router.post('/login', (req, res) => {

  // ...

});

Router.post('/signup', (req, res) => {

  // ...

});

Router.get('/validate' (req, res) => {

  // ...

});

module.exports = Router;
