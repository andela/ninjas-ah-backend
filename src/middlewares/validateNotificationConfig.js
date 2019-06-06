import * as validate from '../helpers/validation';
import status from '../config/status';

export default async (req, res, next) => {
  const errors = {};
  const { error } = validate.notificationConfig(req.body);

  if (error) {
    error.details.map((err) => {
      errors[err.path[0]] = err.message;
      return errors[err.path[0]];
    });
  }

  return !Object.keys(errors).length ? next() : res.status(status.BAD_REQUEST).json({ errors });
};
