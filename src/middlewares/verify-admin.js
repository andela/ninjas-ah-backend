import db from '../models';
import status from '../config/status';

const { User } = db;

/**
 *
 *
 * @export
 * @param {object} req
 * @param {object} res
 * @param {void} next
 * @returns {void}
 */

const verifyAdminUser = async (req, res, next) => {
  const { user } = req;

  const requestUser = await User.findOne({
    where: { id: user.id, role: 'admin' }
  });

  if (!requestUser) {
    return res.status(status.ACCESS_DENIED).json({
      message:
        'Permission denied, you are not allowed to perform this action because you are not an admin'
    });
  }
  return next();
};

export default verifyAdminUser;
