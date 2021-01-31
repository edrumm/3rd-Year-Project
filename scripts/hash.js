const bcrypt = require('bcrypt');

// HASHING
module.exports.hash = async (pw) => {
  let salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(pw, salt);
};


module.exports.match = async (pw, hash) => {

  return await bcrypt.compare(pw, hash);

};
