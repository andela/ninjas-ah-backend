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

  const checkEmail = req.body.email ? validate.email(req.body.email, 'required') : [];
  const checkPassword = req.body.password ? validate.password(req.body.password, 'required') : [];

  if (checkEmail.length) {
    errors.email = errors.email || checkEmail[0];
  }
  if (checkPassword.length) {
    errors.password = errors.password || checkPassword[0];
  }

  return Object.keys(errors).length ? res.status(status.BAD_REQUEST).json({ errors }) : next();
};
