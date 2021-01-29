// const session = require('express-session');

// store who is logged in etc
let session = {};

module.exports.create = (info) => {
  session = info;
};

module.exports.destroy = () => {
  session = {};
};

module.exports.get = () => {
  if (session === {})
    return null;

  return session;
};

// Come back to this later
