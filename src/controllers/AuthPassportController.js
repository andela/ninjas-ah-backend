import status from '../config/status';
import { User } from '../queries';
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
      const errors = helper.checkCreateUpdateUserErrors(newOrExistingUser.errors);
      const statusCode = errors.code;
      delete errors.code;
      return res.status(statusCode).json(errors);
    }
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
}
