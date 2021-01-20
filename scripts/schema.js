const Joi = require('joi');

const login = Joi.object({
  username: Joi.string().requred(),
  password: Joi.string().required()
});

const signup = Joi.object({
  email: Joi.email().required(),
  username:
    Joi.string()
    .min(5)
    .max(25)
    .required(),
  password:
    Joi.string()
    .alphanum()
    .max(30)
    .min(8)
    .required(),
  confirmPassword: Joi.ref('password').required()
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
