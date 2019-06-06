import status from '../config/status';

export default async (req, res, next) => {
  const [email, password] = [req.body.email || null, req.body.password || null];

  const errors = {
    email:
      typeof email === 'string' && email.trim()
        ? null
        : 'email should not be empty and should be a string',
    password:
      typeof password === 'string' && password.trim()
        ? null
        : 'password should not be empty and should be a string'
  };

  Object.keys(errors).forEach(key => errors[key] || delete errors[key]);

  return (
    (Object.keys(errors).length
      && res.status(status.BAD_REQUEST).json({
        errors
      }))
    || next()
  );
};
