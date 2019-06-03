import dotenv from 'dotenv';
import { User } from '../queries';
import * as helper from '../helpers';
import status from '../config/status';

dotenv.config();
/**
 * A class to handle user local authentication
 */
export default class UserController {
  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing the updated profile
   */
  static async update(req, res) {
    const userId = req.userId || req.user.id;

    if (req.body.password) {
      req.body.password = helper.password.hash(req.body.password);
    }
    const updatedUser = await User.update(req.body, { id: userId });
    if (updatedUser.errors) {
      const errors = helper.checkCreateUpdateUserErrors(updatedUser.errors);
      return res.status(errors.code).json(errors);
    }
    delete updatedUser.password;
    return res.status(status.OK).json({
      message: Object.keys(updatedUser).length
        ? 'profile successfully updated'
        : "this account doesn't exist",
      user: updatedUser
    });
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return all users in database
   */
  static async getAllUser(req, res) {
    const role = 'normal';
    const findAll = await User.getAllUser({ role });
    return res.status(status.OK).json({
      message: 'All authors fetched successfully',
      Authors: findAll
    });
  }
}
