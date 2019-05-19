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
   * @param {object} req
   * @param {object} res
   * @return {object} user information & token
   */
  static async signup(req, res) {
    const {
      firstName, lastName, username, email
    } = req.body;
    try {
      const isUser = await helper.isUser({ email });
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
        message: 'email not found..'
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
      return res.status(status.BAD_REQUEST).send({ message: 'Passwords are not matching' });
    }

    if (!req.body.passwordOne || !req.body.passwordTwo) {
      return res.status(status.BAD_REQUEST).send({ message: 'the password can not be empty' });
    }

    const isPasswordValid = validate.password(passwordOne, 'required');
    const isPasswordValidTwo = validate.password(passwordTwo, 'required');

    if (isPasswordValid.length || isPasswordValidTwo.length) {
      return res.status(status.BAD_REQUEST).send({ message: isPasswordValid[0] });
    }
    const { email } = helper.token.decode(token);
    const updatedUser = await User.update(
      { password: helper.password.hash(passwordOne) },
      { email }
    );
    return Object.keys(updatedUser).length
      ? res.status(status.OK).send({ message: 'Success! your password has been changed.' })
      : res.status(status.NOT_MODIFIED).send({ message: 'Password not updated' });
  }
}
