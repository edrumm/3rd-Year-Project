const Joi = require('joi');

const login = Joi.object({
  username: Joi.string().requred(),
  password: Joi.string().required()
});

const signup = Joi.object({
  // TODO
});

module.exports.validateLogin = (data) => {
  let {error, value} = login.validate(data);

  if (error)
    return error;

  return null;
};

module.exports.validateSignup = (data) => {
  let {error, value} = signup.validate(data);

  if (error)
    return error;

  return null;
};
