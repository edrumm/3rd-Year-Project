// const session = require('express-session');

// store who is logged in etc
module.exports.Session = class Session {

  constructor() {
    this.user = null;
  }

  get user() {
    return this._user;
  }

  set user(u) {
    this._user = u;
  }

  destroy() {
    this._user = null;
  }
};

// Come back to this later
