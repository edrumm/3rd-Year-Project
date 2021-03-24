import { Login, Logout } from '../src/firebase';
import { assert } from 'chai';


describe('Login Test', () => {
  it('tests login', () => {

    // enter your own login details
    let email = 'someone@example.com';
    let password = 'password1234';

    Login(email, password).then(() => {
      assert.isOk(true, 'login successful');
    })
    .catch(err => {
      assert.fail(err, 'login returned error');
    });
  });
});

describe('Logout test', () => {
  it('tests logout', () => {
    Logout().then(() => {
      assert.isOk(true, 'logout successful');
    })
    .catch(err => {
      assert.fail(err, 'logout returned error');
    });
  });
});

/**
  Add more tests below
  ...
*/
