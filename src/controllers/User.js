import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import db from '../models/index';

const { User } = db;

dotenv.config();

/**
 * [Users description]
 */
class Users {
  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing the confirmation message
   */
  static async sendEmail(req, res) {
    // check if the email exist
    const { email } = req.body;
    const result = await User.findOne({
      where: {
        email
      }
    });
    if (!result) {
      return res.status(404).send({
        status: 404,
        message: 'email not found..'
      });
    }

    // Create a JWT
    const token = await jwt.sign({ email }, process.env.SECRET, {
      expiresIn: '2h'
    });
    // send Email using sendGrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: 'luctunechi45@gmail.com',
      subject: 'Node.js Password Reset',
      html: `<p>You are receiving this because you (or someone else) have requested the reset of the password,<br>
       Click on the reset link bellow to complete the process<br>
       <a href='http://localhost:3000/api/v1/auth/reset/${token}' target='_blank'>Reset Password</a></p>`
    };

    // return sgMail.send(msg).then(() =>
    //    res.status(200).send({
    //     status: 200,
    //     message: 'Email sent, please check your email'
    //   })
    // );

    await sgMail.send(msg);

    return res.status(200).send({
      status: 200,
      message: 'Email sent, please check your email'
    });
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing the confirmation message
   */
  static async updatePassword(req, res) {
    // verify the token
    const { token } = req.params;
    const { passwordOne, passwordTwo } = req.body;
    if (passwordOne !== passwordTwo) {
      return res.status(400).send({
        status: 400,
        message: 'Passwords are not matching'
      });
    }

    const { email } = jwt.verify(token, process.env.SECRET);

    // UPDATE THE PASSWORD
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
      .pbkdf2Sync(passwordOne, salt, 1000, 64, 'sha512')
      .toString('hex');
    await User.update(
      {
        salt,
        hash
      },
      {
        where: {
          email
        }
      }
    );

    return res.status(200).send({
      status: 200,
      message: 'Success! your password has been changed.'
    });
  }
}

export default Users;
