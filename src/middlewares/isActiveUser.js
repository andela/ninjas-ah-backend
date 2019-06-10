import status from '../config/status';
import * as helper from '../helpers';
/**
 * @param {object} req Request to the route
 * @param {object} res Response from Sserver
 * @param {object} next middleware called to pass after success
 * @returns {object} returned response
 */
export default async (req, res, next) => {
  const input = {};
  if (req.params && req.params.id) {
    input.id = req.params.id;
  } else if (req.params && req.params.username) {
    input.username = req.params.username;
  } else if (req.body && req.body.email) {
    input.email = req.body.email;
  }
  const isUser = await helper.isUser(input);
  if (!isUser) {
    return res.status(status.UNAUTHORIZED).json({
      errors: { account: `user "${input.email || input.id || input.username}" not exist` }
    });
  }
  const isActive = await helper.isActiveUser(input);
  if (!isActive && !(req.user && req.user.role === 'admin')) {
    return res.status(status.UNAUTHORIZED).json({
      errors: { account: 'this account is not activated' }
    });
  }
  next();
};
