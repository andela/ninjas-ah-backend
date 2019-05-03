import * as validate from '../helpers/validation';

export default async (req, res, next) => {
  if (Object.keys(req.body).length <= 0) {
    return res.status(400).json({ errors: { body: ['body can not be empty'] } });
  }

  // check errors in email or password
  const errors = {
    email: [...validate.email(req.body.email, 'required')],
    password: [...validate.password(req.body.password, 'required')]
  };

  const isUser = await validate.isUser({ email: req.body.email });

  if (isUser) {
    errors.email = [...['sorry, this email is already used']];
  }

  Object.keys(errors).forEach(error => errors[error].length > 0 || delete errors[error]);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
