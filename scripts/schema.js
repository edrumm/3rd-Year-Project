const Joi = require('joi');

const login = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const signup = Joi.object({
  email:
    Joi.string()
    .email()
    .required(),
  username:
    Joi.string()
    .min(5)
    .max(25)
    .required(),
  password:
    Joi.string()
    .max(30)
    .min(8)
    .required(),
  confirmPassword: Joi.ref('password')
});

module.exports.login = (data) => {
  let {error, value} = login.validate(data);

  if (error)
    throw error;

  return true;
};

module.exports.signup = (data) => {
  let {error, value} = signup.validate(data);

  if (error)
    throw error;

  return true;
};
