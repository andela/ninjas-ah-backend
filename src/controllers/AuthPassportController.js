import status from '../config/status';
import { User, Token } from '../queries';
import * as helper from '../helpers';

/**
 * A class to handle users authentication using social media platform
 */
export default class AuthPassportController {
  /**
   * @param {object} profile social media user information
   * @returns {object} a user object
   */
  static getSocialMediaUser(profile = {}) {
    const user = {};
    if (profile.displayName) {
      const [firstName, lastName] = profile.displayName.split(' ');
      user.firstName = firstName;
      user.lastName = lastName;
    }
    if (profile.name) {
      user.firstName = profile.name.givenName;
      user.lastName = profile.name.familyName;
    }
    if (profile.emails) {
      user.email = profile.emails[0].value;
    }
    if (profile.username) {
      user.username = profile.username;
    }
    return Object.keys(profile).length
      ? {
        ...user,
        image: profile.photos[0].value,
        accountProvider: profile.provider,
        accountProviderUserId: profile.id
      }
      : {};
  }

  /**
   * @param {object} err
   * @returns {object} an object containing descriptive error messages
   */
  static checkErrors(err = {}) {
    const errors = {};
    if (err.name === 'SequelizeUniqueConstraintError') {
      if (err.fields.email) {
        errors.email = 'email already used';
      }

      if (err.fields.username) {
        errors.username = 'username already used';
      }

      return { errors, code: status.EXIST };
    }
    return { errors: err.message, code: status.SERVER_ERROR };
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} an object containing user information
   */
  static async loginOrSignup(req, res) {
    const user = req.user || req.body || {};
    if (!Object.keys(user).length) {
      return res.status(status.BAD_REQUEST).json({ errors: { body: 'should not be empty' } });
    }
    const newOrExistingUser = await User.findOrCreate(
      { accountProvider: user.provider, accountProviderUserId: user.id },
      AuthPassportController.getSocialMediaUser(user)
    );

    if (newOrExistingUser.errors) {
      const errors = AuthPassportController.checkErrors(newOrExistingUser.errors);
      const statusCode = errors.code;
      delete errors.code;
      return res.status(statusCode).json(errors);
    }

    await AuthPassportController.clearInvalidToken(newOrExistingUser[0].id);
    delete newOrExistingUser[0].password;
    return res.status(newOrExistingUser[1] ? status.CREATED : status.OK).json({
      user: newOrExistingUser[0],
      token: helper.token.generate({
        id: newOrExistingUser[0].id,
        role: newOrExistingUser[0].role,
        permissions: newOrExistingUser[0].permissions
      })
    });
  }

  /**
   * @param {int} userId
   * @return {object|boolean} true if every invalid token was destroyed or an error object
   */
  static async clearInvalidToken(userId) {
    const destroyToken = typeof userId === 'number' ? await Token.destroy(userId) : {};
    return destroyToken.errors ? destroyToken.errors.message : {};
  }
}
