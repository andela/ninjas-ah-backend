import status from '../config/status';

export default (req, res, next) => {
  req.userId = req.user.id;
  if (req.params && req.params.id) {
    if (req.user.role === 'admin') {
      req.userId = req.params.id;
    } else {
      return res.status(status.UNAUTHORIZED).json({
        errors: { authentication: "sorry, you don't have the permission to update this account" }
      });
    }
  }
  next();
};
