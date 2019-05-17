import db from '../models';
import { getUserbyUsername } from '../queries/users/findOneUser';
import status from '../config/status';

const { User } = db;

/**
 * Fetch all users and roles
 *
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @returns {*} success response
 * @throws {*} error if database error
 */

const getAllRoles = async (req, res) => {
  try {
    const roles = await User.findAll({
      attributes: ['id', 'email', 'username', 'role']
    });
    return res.status(res, status.OK, 'roles fetched successfully', roles);
  } catch (error) {
    return error.message;
  }
};

/**
 * Make a user an admin
 *
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @returns {*} success response
 * @throws {*} error if database error
 */
const updateUserRole = async (req, res) => {
  const { role } = req.body;
  const { username } = req.params;

  const user = await getUserbyUsername(username);
  if (!user) {
    return res.status(res, status.NOT_FOUND, 'This user does not exist', true);
  }
  if (user.role === role) {
    return res.status(res, status.EXIST, `This user is already an ${role}`, true);
  }

  try {
    const updatedUser = await User.update({ role }, { where: { username }, returning: true });
    return res.status(res, status.OK, 'role updated successfully', updatedUser);
  } catch (error) {
    return error.message;
  }
};

export { getAllRoles, updateUserRole };
