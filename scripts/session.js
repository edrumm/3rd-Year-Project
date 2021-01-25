// const session = require('express-session');

// store who is logged in etc
let session = {};

module.exports.createSession = (data) => {
  sessison = data;
};

module.exports.sessionInfo = () => {
  return sesison;
};

module.exports.destroy = () => {
  session = {};
}
