const assert = require('chai').assert;
const schema = require('./../scripts/schema');

describe('Login Test', () => {
  it ('Login schema', () => {
    assert.equal(0, schema.login({username: 'username01', password: 'mypassword1234'}));
  });

  it ('Invalid login', () => {
    assert.throws(() => { schema.login({}) }, Error);
  });
});

describe('Signup Test', () => {
  it ('Signup schema', () => {
    let details = {
      email: 'mail@gmail.com',
      username: 'username1234',
      password: 'passwOrd1£',
      confirmPassword: 'passwOrd1£'
    };

    assert.equal(0, schema.signup(details));
  });

  it ('Invalid signup', () => {
    let details = {
      email: 'mail@gmail.com',
      username: 'username1234',
      password: 'passwOrd1£',
      confirmPassword: 'differentPassword'
    };

    assert.throws(() => { schema.signup({}) }, Error);
  });
});
