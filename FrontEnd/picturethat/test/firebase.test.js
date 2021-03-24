import { Login } from '../src/firebase';
import { assert } from 'chai';


describe('Login Test', () => {
  it('tests login', () => {
    Login('esd0658@googlemail.com', 'ckasTy88').then(() => {
      assert.isOk(true);
    })
    .catch(err => {
      assert.fail(err, 'login returned error');
    });
  });
});
