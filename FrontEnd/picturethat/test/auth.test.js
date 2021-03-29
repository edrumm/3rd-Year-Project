import { Auth, Login, Logout } from '../src/firebase';
import firebase from '../src/firebase';
import { assert } from 'chai';

Login('someone@example.com', 'password1234').catch(err => console.error(err));

// generic_user1

describe('Username and ID Test', () => {
  it('tests username returns', () => {
    let user = firebase.getUser();
    assert.equal(user.displayName, 'generic_user1');
  });

  it('tests user ID returns', () => {
    assert.isNotNull(firebase.getUserID());
  });
});

Logout().catch(err => console.error(err));

describe('Logged Out Username and ID Test', () => {
  it('tests username is null', () => {
    assert.isNull(firebase.getUser());
  });

  it('tests user ID is null', () => {
    assert.isNull(firebase.getUserID());
  });
});
