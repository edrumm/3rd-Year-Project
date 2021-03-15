import joi from 'joi';

// Schema for username / password for login
const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});

const signupSchema = joi.object({
  email:
    joi.string()
    .email()
    .required(),
  username:
    joi.string()
    .min(5)
    .max(20)
    .required(),
  password:
    joi.string()
    .pattern(new RegExp('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/')),
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
const login = (credentials) => {
  let { error, value } = loginSchema.validate(credentials);

  if (error)
    throw error;
};

export default { login, signup };
