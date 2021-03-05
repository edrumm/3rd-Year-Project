// ALL TESTS OK AS OF 04/03/21

require('dotenv').config();
const assert = require('chai').assert;
const { db } = require('./../scripts/firebase-auth');
const firebase = require('./../scripts/firebase');
const { Session } = require('./../scripts/session');

let session = new Session();

describe('Empty session', () => {

  it('Empty session should be null', () => {
    assert.isNull(session.user);
  });

});

describe('Session create', () => {

  it('Create session', () => {
    firebase.get(db, 'placeholder_user_1')
    .then(res => {
      session.user = res.user;
      assert.isNotNull(session.user);
    })
    .catch(err => console.error(err));
  });

});

describe('Session logout / destroy', () => {

  it('Destroy session', () => {
    session.destroy();
    assert.isNull(session.user);
  });

})
