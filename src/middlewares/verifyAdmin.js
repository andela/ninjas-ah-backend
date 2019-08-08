import status from '../config/status';
import isUser from '../helpers/isUser';

/**
 *
 *
 * @export
 * @param {object} req
 * @param {object} res
 * @param {void} next
 * @returns {void}
 */
export default async (req, res, next) => {
  const id = req.user ? req.user.id : 0;
  const requestUser = await isUser({ id, role: 'admin' });

  if (!requestUser) {
    return res.status(status.ACCESS_DENIED).json({
      message: 'Permission denied, you are not allowed to perform this action'
    });
  }
  return next();
};
