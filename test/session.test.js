require('dotenv').config();
const assert = require('chai').assert;
const { db } = require('./../scripts/firebase-auth');
const firebase = require('./../scripts/firebase');
const session = require('./../scripts/session');

describe('Empty session', () => {

  if('Empty session should be null', () => {
    assert.isNull(session.get());
  });

});

describe('Session create', () => {

  it('Create session', () => {
    firebase.get(db, 'placeholder_user_1')
    .then(res => {
      session.create(res.info);
      assert.isNotNull(session.get());
    })
    .catch(err => console.error(err));
  });

});

describe('Session logout / destroy', () => {

  it('Destroy session', () => {
    session.destroy();
    assert.isNull(session.get());
  });

})
