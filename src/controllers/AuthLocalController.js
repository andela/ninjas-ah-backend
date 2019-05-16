import { User } from '../queries';
import * as helper from '../helpers';
import * as validate from '../helpers/validation';
import status from '../config/status';

/**
 * A class to handle user local authentication
 */
export default class AuthLocalController {
  /**
   * @param {object} req
   * @param {object} res
   * @return {object} user information & token
   */
  static async signup(req, res) {
    const {
      firstName, lastName, username, email
    } = req.body;
    try {
      const isUser = await validate.isUser({ email });
      if (isUser) {
        return res.status(status.EXIST).send({ error: 'Sorry, this account already exists' });
      }
      const newUser = await User.create({
        firstName,
        lastName,
        username,
        email,
        password: helper.password.hash(req.body.password)
      });
      if (!newUser.errors && newUser && Object.keys(newUser).length > 0) {
        delete newUser.password;
        return res.status(status.CREATED).send({
          user: newUser,
          token: helper.token.generate({ email, role: req.body.isAdmin })
        });
      }
    } catch (error) {
      return res.status(status.SERVER_ERROR).send({ error });
    }
  }

  /**
   * @description - login user function
   * @param {object} req
   * @param {object} res
   * @returns {object} user token
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const checkUser = await User.findOne({ email });
      if (Object.keys(checkUser).length > 0) {
        const comparePassword = helper.password.compare(password, checkUser.password);
        if (!comparePassword) {
          return res.status(status.UNAUTHORIZED).send({
            message: 'The credentials you provided is incorrect'
          });
        }
        const payload = { id: checkUser.id, role: checkUser.role };
        const token = helper.token.generate(payload);
        delete checkUser.password;
        return res.status(status.OK).send({
          user: checkUser,
          token
        });
      }
      return res
        .status(status.UNAUTHORIZED)
        .send({ error: `User with ${email} email doesn't exist!!!` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  }
}
