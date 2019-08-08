import status from '../config/status';
import getPermissions from '../config/permissions';

export default async (req, res, next) => {
  let isAllowed = true;
  [req.user, req.body] = [req.user || {}, req.body || {}];
  const role = req.user.role || null;
  const defaultPermissions = (await getPermissions()).normal;
  const permissions = req.body.permissions && JSON.stringify(req.body.permissions);

  if (!role || role === 'normal') {
    if (req.body.role || req.body.permissions) {
      isAllowed = false;
    }
  }
  req.user.permissions = defaultPermissions; // social media sign up permissions
  req.body.permissions = permissions || defaultPermissions; // local sign up
  return isAllowed
    ? next()
    : res.status(status.UNAUTHORIZED).json({
      errors: {
        permissions: "sorry, you don't have the permission to perform this action"
      }
    });
};
