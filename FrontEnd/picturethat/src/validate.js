import joi from 'joi';

// Schema for username / password for login
const loginSchema = joi.object({
  email:
    joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi.string().required()
});

const signupSchema = joi.object({
  email:
    joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  username:
    joi.string()
    .min(5)
    .max(20)
    .required(),
  password:
    joi.string()
    .alphanum()
    .min(6),
  confirmEmail: joi.ref('email'),
  confirmPassword: joi.ref('password')
});

// Check signup, throws error if invalid
const signup = (credentials) => {
  let { error, value } = signupSchema.validate(credentials);

  if (error)
    throw error;
};

// Check login, throws error if invalid
const signin = (credentials) => {
  let { error, value } = loginSchema.validate(credentials);

  if (error)
    throw error;
};

export default { signin, signup };
