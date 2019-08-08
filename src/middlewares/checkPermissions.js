import status from '../config/status';

export default (Object.checkPermissions = permission => (req, res, next) => {
  const permissions = JSON.parse(req.user.permissions);

  if (!permissions[permission.route]) {
    return res.status(status.BAD_REQUEST).json({
      errors: {
        permission: "Sorry, the resource you try to access doesn't exist"
      }
    });
  }

  if (permissions[permission.route].includes(permission.action)) {
    return next();
  }

  return res.status(status.UNAUTHORIZED).json({
    errors: {
      permission:
        permission.message || "sorry, you don't have the required permission to access this route"
    }
  });
});
