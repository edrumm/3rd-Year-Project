import validate from '../src/validate';
import { assert } from 'chai';

describe('Login Validate Test', () => {
  it('tests valid login data', () => {

    let details = {
      email: 'someone@gmail.com',
      password: 'password12345'
    };

    assert.doesNotThrow(() => { validate.signin(details) }, Error);
  });

  it('tests invalid login data', () => {
    assert.throws(() => { validate.signin({}) }, Error);
  });
});

describe('Signup Validate Test', () => {
  let details = {
    email: 'someone@gmail.com',
    username: 'someuser_01x',
    password: 'password12345',
    confirmEmail: 'someone@gmail.com',
    confirmPassword: 'password12345'
  };

  let invalidDetails = {
    email: 'someone@gmail.com',
    username: 'someuser_01x',
    password: 'passw',
    confirmEmail: '',
    confirmPassword: 'password12345'
  };

  it('tests valid signup data', () => {
    assert.doesNotThrow(() => { validate.signup(details) }, Error);
  });

  it('tests invalid signup data', () => {
    assert.throws(() => { validate.signup({invalidDetails}) }, Error);
  });
});
