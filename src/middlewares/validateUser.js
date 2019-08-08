import * as validate from '../helpers/validation';
import status from '../config/status';

export default async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(status.BAD_REQUEST).json({ errors: { body: 'should not be empty' } });
  }
  const errors = {};
  const { error } = req.method === 'POST' ? validate.newUser(req.body) : validate.updateUser(req.body);

  if (error && typeof error === 'object' && Object.keys(error).length) {
    error.details.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
  }

  Object.keys(req.body).forEach((key) => {
    const validatedField = (['firstName', 'lastName', 'username'].includes(key)
        && validate.name(req.body[key], null, key))
      || (key === 'email' && validate.email(req.body.email, 'required')[0])
      || (key === 'password' && validate.password(req.body.password, 'required')[0])
      || null;

    if (validatedField && validatedField !== true) {
      errors[key] = errors[key] || validatedField;
    }
  });

  return Object.keys(errors).length ? res.status(status.BAD_REQUEST).json({ errors }) : next();
};
