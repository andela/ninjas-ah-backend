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
    if (req.body.password) {
      req.body.password = helper.password.hash(req.body.password);
    }
    const updatedUser = await User.update(req.body, { id: req.userId || req.user.id });
    if (updatedUser.errors) {
      const errors = helper.checkCreateUpdateUserErrors(updatedUser.errors);
      return res.status(errors.code).json(errors);
    }
    return res.status(status.OK).json({
      message: Object.keys(updatedUser).length
        ? 'profile successfuly updated'
        : "this account doesn't exist",
      user: updatedUser
    });
  }
}
