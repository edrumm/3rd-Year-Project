require('dotenv').config();
const assert = require('chai').assert;
const firebase = require('./../scripts/firebase');

describe('Get Test', () => {
  it('Users', () => {
    return firebase.get('users')
    .then(res => assert.isNotEmpty(res));
  });

  it('Posts', () => {
    return firebase.get('posts')
    .then(res => assert.isNotEmpty(res));
  });

  it('Comments', () => {
    return firebase.get('comments')
    .then(res => assert.isNotEmpty(res));
  });

  it('Channels', () => {
    return firebase.get('channels')
    .then(res => assert.isNotEmpty(res));
  });

  /* Needs finishing
  it('Check query', () => {
    let query = {
        field: 'email',
        operand: '==',
        value: 'mail@gmail.com'
    };

    return firebase.get('username', query)
    .then(res => );
  });
  */
});

describe('Login', () => {
  it('DB login', () => {
    return firebase.login({username: 'placeholder_user_1', password: 'myPass123$'})
    .then(result => assert.isTrue(result));
  });

  it('Nonexistant DB login', () => {
    return firebase.login({username: 'placeholder_user_2', password: 'xyz123'})
    .then(result => assert.isFalse(result));
  });
});
