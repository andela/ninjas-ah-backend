import 'dotenv/config';
import status from '../config/status';
import { User } from '../queries';
import { checkCreateUpdateUserErrors, token as tokenHelper, urlHelper } from '../helpers';

const { CI } = process.env;
const { appUrl, travis } = urlHelper.frontend;
/**
 * A class to handle users authentication using social media platform
 */
export default class AuthPassportController {
  /**
   * @param {object} profile social media user information
   * @returns {object} a user object
   */
  static getUser(profile = {}) {
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
    user.username = profile.username || `${user.firstName}.${user.lastName}`;
    return Object.keys(profile).length
      ? {
        ...user,
        permissions: profile.permissions,
        image: profile.photos[0].value,
        accountProvider: profile.provider,
        accountProviderUserId: profile.id,
        isActive: true
      }
      : {};
  }

  /**
   * @param {int} id
   * @param {string} role
   * @param {string} permissions
   * @returns {string} a link to redirect the user
   */
  static redirectOnSuccess({ id, role, permissions }) {
    const token = tokenHelper.generate({
      id,
      role,
      permissions
    });
    return `${(CI && travis) || appUrl}/auth?id=${id}&token=${token}`;
  }

  /**
   * @param {int} errorCode
   * @param {object} errors
   * @returns {string} a link to redirect the user
   */
  static redirectOnError(errorCode, errors) {
    let URL = `${(CI && travis) || appUrl}/auth?code=${errorCode}`;
    URL = errors.email ? `${URL}&email=${errorCode}` : URL;
    URL = errors.username ? `${URL}&username=${errorCode}` : URL;
    return URL;
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} an object containing user information
   */
  static async loginOrSignup(req, res) {
    if (req.user && !Object.keys(req.user).length) {
      return res.redirect(`${(CI && travis) || appUrl}/auth?code=${status.BAD_REQUEST}`);
    }
    const findOrCreateUser = await User.findOrCreate(
      { accountProvider: req.user.provider, accountProviderUserId: req.user.id },
      AuthPassportController.getUser(req.user)
    );
    const { errors, code } = checkCreateUpdateUserErrors(findOrCreateUser.errors);
    if (errors && code) {
      return res.redirect(AuthPassportController.redirectOnError(code, errors));
    }

    return res.redirect(AuthPassportController.redirectOnSuccess(findOrCreateUser[0]));
  }
}
