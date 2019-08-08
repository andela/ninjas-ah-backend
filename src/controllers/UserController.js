import 'dotenv/config';
import { User } from '../queries';
import status from '../config/status';
import {
  checkCreateUpdateUserErrors, sendMail, token as tokenHelper, urlHelper
} from '../helpers';

const { CI } = process.env;
const { appUrl, travis } = urlHelper.frontend;

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
    const updatedUser = await User.update(req.body, { id: userId });

    if (updatedUser.errors) {
      const errors = checkCreateUpdateUserErrors(updatedUser.errors);
      return res.status(errors.code).json({ errors: errors.errors });
    }

    delete updatedUser.password;

    if (req.changeEmail.newEmail) {
      await sendMail(req.changeEmail.newEmail, 'updateEmail', {
        userId,
        email: req.changeEmail.newEmail
      });
    }

    return res.status(status.OK).json({
      message: `Profile successfully updated. ${req.changeEmail.message}`,
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
    const [offset, limit] = [req.query.offset || 0, req.query.limit || 20];
    const users = await User.getAllUser({}, offset, limit);

    return res.status(status.OK).json({
      users: users.map(user => delete user.get().password && user)
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

  // follow user
  /**
   * @description function to create user follows
   * @param {object} req request from user
   * @param {object} res server response
   * @returns {object} true
   */
  static async follow(req, res) {
    const { username } = req.params;
    const checkUser = await User.findOne({ username });
    if (checkUser.id === req.user.id) {
      return res
        .status(status.BAD_REQUEST)
        .json({ errors: { follow: 'You can not follow your self ' } });
    }
    const follow = await User.follow.add({
      followed: checkUser.id,
      userId: req.user.id
    });
    if (follow.errors) {
      return follow.errors.name === 'SequelizeUniqueConstraintError'
        ? res
          .status(status.EXIST)
          .send({ errors: { follow: `You are already following "${username}"` } })
        : res.status(status.SERVER_ERROR).json({ errors: 'oops, something went wrong' });
    }
    return res.status(status.CREATED).json({
      message: `now you are following ${checkUser.username}`,
      follow: { ...follow, followedUser: checkUser }
    });
  }

  // unFollow user
  /**
   * @description function to allow user to unfollow users
   * @param {object} req user request
   * @param {object} res response from server
   * @returns {object} true
   */
  static async unfollow(req, res) {
    const [username, user] = [req.params.username, req.user];
    const checkUser = await User.findOne({ username });

    const hasUnfollowed = Object.keys(checkUser).length
      ? await User.follow.remove({ userId: user.id, followed: checkUser.id })
      : null;
    if (hasUnfollowed && hasUnfollowed.errors) {
      return res.status(status.SERVER_ERROR).json({ errors: 'oops, something went wrong!!' });
    }
    return hasUnfollowed
      ? res.status(status.OK).json({
        message: `you unfollowed ${username}`,
        followed: checkUser.id
      })
      : res
        .status(status.BAD_REQUEST)
        .json({ errors: { follow: `you are not following "${username}"` } });
  }

  /**
   * @description function to fetch users'followers
   * @param {object} req
   * @param {object} res
   * @returns {object} followers
   */
  static async followers(req, res) {
    const { id } = req.user;
    const followers = await User.follow.getAll({ followed: id });
    return followers.length
      ? res.status(status.OK).json({
        message: 'Followers',
        followers: followers.map(follower => delete follower.get().followedUser && follower)
      })
      : res.status(status.NOT_FOUND).json({
        errors: { follows: "You don't have followers" }
      });
  }

  /**
   * @description function to fetch all authors who user follow
   * @param {object} req
   * @param {object} res
   * @returns {object} followers
   */
  static async following(req, res) {
    const following = await User.follow.getAll({ userId: req.user.id });
    const follows = following.map(followed => delete followed.get().follower && followed);
    if (following.length) {
      return res.status(status.OK).json({
        message: 'Following',
        following: follows
      });
    }
    return res.status(status.NOT_FOUND).json({
      errors: { follows: "You don't follow any one" }
    });
  }

  /**
   * @description confirm email update
   * @param {object} req
   * @param {object} res
   * @returns {object} redirection link
   */
  static async confirmEmailUpdate(req, res) {
    const redirectUrl = (CI && travis) || appUrl;
    const decodedToken = tokenHelper.decode(req.params.token);

    if (!decodedToken.errors || decodedToken.email) {
      await User.update({ email: decodedToken.email }, { id: decodedToken.userId });
      return res.redirect(`${redirectUrl}/profile?email=${decodedToken.email}`);
    }
    return res.redirect(`${redirectUrl}/profile?token=${status.UNAUTHORIZED}`);
  }
}
