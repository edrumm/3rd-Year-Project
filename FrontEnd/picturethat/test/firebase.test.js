import { Login } from '../src/firebase';
import { assert } from 'chai';


describe('Login Test', () => {
  it('tests login', () => {

    // enter your own login details
    let email = '...';
    let password = '...';

    Login(email, password).then(() => {
      assert.isOk(true, 'login successful');
    })
    .catch(err => {
      assert.fail(err, 'login returned error');
    });
  });
});

/**
  Add more tests below
  ...
*/
