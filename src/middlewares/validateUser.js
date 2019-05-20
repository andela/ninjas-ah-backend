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
      if (errors[err.path[0]] && errors[err.path[0]].length) {
        errors[err.path[0]] = [...[err.message]];
      } else {
        errors[err.path[0]] = [err.message];
      }
    });
  }

  const checkEmail = req.body.email ? validate.email(req.body.email, 'required') : [];
  const checkPassword = req.body.password ? validate.password(req.body.password, 'required') : [];

  if (checkEmail.length) {
    errors.email = checkEmail;
  }
  if (checkPassword.length) {
    errors.password = checkPassword;
  }

  if (Object.keys(errors).length) {
    return res.status(status.BAD_REQUEST).json({ errors });
  }

  next();
};
