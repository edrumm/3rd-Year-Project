import { Login, AchievementUnlock, Logout } from '../src/firebase';
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

describe('Achievement Unnlock Test', () => {
  it('tests unlocking an achievement', () => {
    AchievementUnlock('1-photo')
    .then(res => {
      // should be false as user will have this achievement already
      assert.isFalse(res);
    })
    .catch(err => assert.fail(err.message));
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
