import status from '../config/status';
import getPermissions from '../config/permissions';

export default async (req, res, next) => {
  let isAllowed = true;
  [req.user, req.body] = [req.user || {}, req.body || {}];
  const role = req.user.role || null;

  if (!role || role === 'normal') {
    if (req.body.role || req.body.permissions) {
      isAllowed = false;
    }
  }

  req.user.permissions = (await getPermissions()).normal; // social media sign up permissions
  req.body.permissions = req.body.permissions || (await getPermissions()).normal; // local sign up

  return isAllowed
    ? next()
    : res.status(status.UNAUTHORIZED).json({
      errors: {
        permissions: "sorry, you don't have the permission to perform this action"
      }
    });
};
