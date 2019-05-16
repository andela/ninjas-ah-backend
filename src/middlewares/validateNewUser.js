import * as validate from '../helpers/validation';
import status from '../config/status';

export default async (req, res, next) => {
  const errors = {};
  const { error } = validate.newUser(req.body);

  if (error && typeof error === 'object' && Object.keys(error).length) {
    error.details.forEach((err) => {
      if (errors[err.path[0]] && errors[err.path[0]].length) {
        errors[err.path[0]] = [...[err.message]];
      } else {
        errors[err.path[0]] = [err.message];
      }
    });
  }

  if (errors && !Object.keys(errors).length) {
    const checkEmail = validate.email(req.body.email, 'required');
    const checkPassword = validate.password(req.body.password, 'required');

    if (checkEmail.length) {
      errors.email = checkEmail;
    }
    if (checkPassword.length) {
      errors.password = checkPassword;
    }
  }

  if (Object.keys(errors).length) {
    return res.status(status.BAD_REQUEST).json({ errors });
  }

  next();
};
