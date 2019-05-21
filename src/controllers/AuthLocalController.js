import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../queries';
import * as helper from '../helpers';
import * as validate from '../helpers/validation';
import status from '../config/status';

dotenv.config();
/**
 * A class to handle user local authentication
 */
export default class AuthLocalController {
  /**
   * @description user signup function
   * @param {object} req request from user
   * @param {object} res response from server
   * @return {object} user information & token
   */
  static async signup(req, res) {
    req.body.password = helper.password.hash(req.body.password);
    const newUser = await User.create(req.body);
    if (newUser.errors) {
      const { constraint } = newUser.errors.original;
      const column = constraint === 'Users_email_key' ? 'email' : 'username';
      return res.status(status.EXIST).json({
        message: `${column} already used`
      });
    }
    delete newUser.password;
    return res.status(status.CREATED).send({
      user: newUser
    });
  }

  /**
   * @description - login user function
   * @param {object} req user request
   * @param {object} res  response form server
   * @returns {object} user token
   */
  static async login(req, res) {
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
        message: 'signIn successfully',
        user: checkUser,
        token
      });
    }
  }

  /**
   * @description function to delete user
   * @param {object} req user request object
   * @param {object} res response object from server
   * @returns {object} return true if user deleted or false when user not deleted
   */
  static async deactivateAccount(req, res) {
    const { id } = req.params;
    const deactivateAccount = await User.update({ isActive: false }, { id });
    return deactivateAccount
      ? res.status(status.OK).send({ message: 'User account deleted successfully' })
      : res.status(status.UNAUTHORIZED).send({ errors: 'Unauthorized access' });
  }

  /**
   * @description methode to find one user
   * @param {object} req user request object
   * @param {object} res response object from server
   * @returns {object} return all users
   */
  static async getOne(req, res) {
    const { id } = req.params;
    const fetchUser = await User.findOne({ id });
    if (Object.keys(fetchUser).length > 0) {
      return res.status(status.OK).send({ fetchUser });
    }
    return res.status(status.NOT_FOUND).send({ errors: `sorry, user with id ${id} not found!!` });
  }

  /**
   * @description methode to find all users
   * @param {object} req user request object
   * @param {object} res response object from server
   * @returns {object} return all users
   */
  static async getAll(req, res) {
    const users = await User.findAll({ isActive: true });
    if (users && Array.isArray(users)) {
      users.forEach((user) => {
        delete user.get().password;
      });
    }
    if (users.length && users.dataValues !== null) {
      return res.status(status.OK).send({ users });
    }
    return res.status(status.NOT_FOUND).send({
      message: 'user table is empty',
      users
    });
  }

  /**
   * @description function for admin to create user
   * @param {object} req user request object
   * @param {object} res response object from server
   * @returns {object} return true if user created or flase when was not
   */
  static async create(req, res) {
    req.body.password = helper.password.hash(req.body.password);
    const newUser = await User.create(req.body);
    if (newUser.errors) {
      const errors = helper.checkCreateUpdateUserErrors(newUser.errors);
      const { code } = errors;
      delete errors.code;
      return res.status(code).json(errors);
    }
    if (newUser) {
      delete newUser.password;
      return res.status(status.CREATED).send({
        user: newUser
      });
    }
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing the confirmation message
   */
  static async sendEmail(req, res) {
    const { email } = req.body;
    const result = await User.findOne({ email }); // check if the email exist
    if (Object.keys(result).length <= 0) {
      return res.status(404).send({
        errors: 'email not found..'
      });
    }

    await helper.sendMail(email); // send mail

    return res.status(200).json({
      message: 'Email sent, please check your email'
    });
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing the confirmation message
   */
  static async updatePassword(req, res) {
    const token = req.body.token || req.params.token;
    const { passwordOne, passwordTwo } = req.body;
    if (passwordOne !== passwordTwo) {
      return res.status(status.BAD_REQUEST).send({ errors: 'Passwords are not matching' });
    }

    if (!req.body.passwordOne || !req.body.passwordTwo) {
      return res.status(status.BAD_REQUEST).send({ errors: 'the password can not be empty' });
    }

    const isPasswordValid = validate.password(passwordOne, 'required');
    const isPasswordValidTwo = validate.password(passwordTwo, 'required');

    if (isPasswordValid.length || isPasswordValidTwo.length) {
      return res.status(status.BAD_REQUEST).send({ message: isPasswordValid[0] });
    }
    const { email } = jwt.verify(token, process.env.SECRET_KEY);
    const isUpdated = await User.update({ password: helper.password.hash(passwordOne) }, { email });
    return isUpdated
      ? res
        .status(status.OK)
        .send({ isUpdated, message: 'Success! your password has been changed.' })
      : res.status(status.NOT_MODIFIED).send({ errors: 'Password not updated' });
  }
}
