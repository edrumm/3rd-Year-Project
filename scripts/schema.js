const Joi = require('joi');

const login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});

/* TO DO: Revise signup to match the new database structure (might be able to remove .min/max() as front end validates*/
const signup = Joi.object({
  email:
    Joi.string()
    .required(),
  password:
    Joi.string()
    .max(30)
    .min(6)
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
