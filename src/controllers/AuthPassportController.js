import status from '../config/status';
import { User } from '../queries';
import * as helper from '../helpers';

/**
 * A class to handle users authentication using social media platform
 */
export default class AuthPassportController {
  /**
   * @param {object} user
   * @returns {object} an object containing user information
   */
  static async signup(user = {}) {
    const newUser = Object.keys(user).length
      ? await User.createUser(helper.passportSocialMediaUser(user))
      : {};

    if (!newUser.errors && Object.keys(newUser).length > 0) {
      return {
        code: status.CREATED,
        user: newUser,
        token: helper.tokenGenerator({ id: newUser.id, role: newUser.role })
      };
    }

    return {
      code: newUser.errors ? status.SERVER_ERROR : status.BAD_REQUEST,
      error: 'account not created'
    };
  }

  /**
   * @param {object} user
   * @returns {object} an object containing user information
   */
  static login(user = {}) {
    return {
      code: status.OK,
      message: `welcome ${user.firstName} ${user.lastName}`,
      user,
      token: helper.tokenGenerator({ id: user.id, role: user.role })
    };
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} an object containing user information
   */
  static async loginOrSignup(req, res) {
    const user = req.user || req.body || {};
    const findUser = user.id && user.provider
      ? await User.findOne({
        accountProvider: user.provider,
        accountProviderUserId: user.id
      })
      : {};

    if (findUser.errors) {
      return res.status(status.SERVER_ERROR).json({
        error: 'sorry, something went wrong'
      });
    }

    const result = Object.keys(findUser).length
      ? await AuthPassportController.login(findUser)
      : await AuthPassportController.signup(user);

    const statusCode = result.code;
    delete result.code;
    return res.status(statusCode).json(result);
  }
}
