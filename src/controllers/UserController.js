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
      return res.status(errors.code).json({ errors: errors.errors });
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
  static async getAllAuthors(req, res) {
    const role = 'normal';
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 20;
    const authors = (await User.getAllUser({ role }, offset, limit)).map(
      author => delete author.get().password && author
    );
    return res.status(status.OK).json({
      authors
    });
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return all users in database
   */
  static async getAll(req, res) {
    const role = req.user.role === 'normal' ? 'normal' : null;
    const [offset, limit] = [req.query.offset || 0, req.query.limit || 20];
    const findAll = role
      ? await User.getAllUser({ role }, offset, limit)
      : await User.getAllUser({}, offset, limit);

    return res.status(status.OK).json({
      [req.user.role === 'normal' ? 'authors' : 'users']:
        findAll
        && Array.isArray(findAll)
        && findAll.map((author) => {
          delete author.get().password;
          return author;
        })
    });
  }

  /**
   *  Make a user an admin
   * @param {Object} req express request object
   * @param {Object} res express response object
   * @returns {*} success response
   * @throws {*} error if database error
   */
  static async updateUserRole(req, res) {
    const { role } = req.body;
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user.errors && !Object.keys(user).length) {
      return res
        .status(status.NOT_FOUND)
        .json({ message: `This user with the username ${username} does not exist` });
    }
    if (user.role === role) {
      return res.status(status.EXIST).send({ message: 'The user already has this role' });
    }
    if (!req.body.role) {
      return res.status(status.BAD_REQUEST).send({ message: 'the role can not be empty' });
    }
    const updatedUser = await User.update({ role }, { username });
    delete updatedUser.password;
    return res.status(status.OK).json({ message: 'roles updated successfully', updatedUser });
  }
}
