import { Login } from '../src/firebase';
import firebase from '../src/firebase';
import { assert } from 'chai';

Login('someone@gmail.com', 'password1234').catch(err => console.error(err));

describe('Data Get Test', () => {
  it('gets field from document', () => {
    firebase.TotalScore()
    .then(score => assert.isNotNull(score))
    .catch(err => assert.fail(err, 'score was null'));
  });
});

describe('Collection Get Test', () => {
  it('gets data from collection', () => {
    firebase.GetAllUserChannelPosts()
    .then(posts => assert.isNotNull(posts))
    .catch(err => assert.fail(err, 'users empty'));
  });
});
