import status from '../config/status';

export default (req, res, next) => {
  req.userId = req.user.id;
  const { role } = req.user;
  let isAllowed = true;

  if (req.params && req.params.id) {
    if (role === 'admin') {
      req.userId = req.params.id;
    } else {
      isAllowed = false;
    }
  }
  if (role === 'normal') {
    if (req.body.role || req.body.permissions) {
      isAllowed = false;
    }
  }
  return isAllowed
    ? next()
    : res.status(status.UNAUTHORIZED).json({
      errors: { authentication: "sorry, you don't have the permission to update this account" }
    });
};
