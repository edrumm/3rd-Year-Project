// const session = require('express-session');

// store who is logged in etc
let session = {};

module.exports.create = (info) => {
  if (this.get() === null) {
    session = info;
  }
};

module.exports.destroy = () => {
  session = {};
};

module.exports.get = () => {
  if (Object.keys(session).length === 0)
    return null;

  return session;
};

// Come back to this later
