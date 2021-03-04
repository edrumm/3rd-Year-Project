// ALL TESTS OK AS OF 04/03/21

const assert = require('chai').assert;
const schema = require('./../scripts/schema');

describe('Login Test', () => {
  it ('Login schema', () => {
    assert.isTrue(schema.login({email: 'username01', password: 'mypassword1234'}));
  });

  it ('Invalid login', () => {
    assert.throws(() => { schema.login({}) }, Error);
  });
});

describe('Signup Test', () => {
  it ('Signup schema', () => {
    let details = {
      email: 'mail@gmail.com',
      password: 'passwOrd1£',
      confirmPassword: 'passwOrd1£'
    };

    assert.isTrue(schema.signup(details));
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
