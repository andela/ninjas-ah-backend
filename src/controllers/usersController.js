/* eslint-disable require-jsdoc */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import usersQueries from '../models/queries';
import db from '../models';
// import helper from '../helpers';
// import passportStratagy from '../helpers/passport';

const { User } = db;

dotenv.config();

// create a controller to register new user
class usersController {
  static async signup(req, res) {
    console.log('hello dev');
    const {
      firstName, lastName, username, email, password
    } = req.body;
    const checkUser = await usersQueries.getOne({ email });
    if (checkUser) {
      return res.status(200).json({
        error: 'Sorry, this account already exists',
      });
    }
    try {
      // const hashPassword = bcrypt.hashSync(password, 8);
      const user = {
        firstName,
        lastName,
        username,
        email,
        password,
      };
      console.log(user);
      const registerUser = await usersQueries.create(user);

      if (Object.keys(registerUser.dataValues).length > 0) {
        const token = jwt.sign({
          email,
          userType: req.body.isAdmin,
        }, process.env.SECRET_KEY, {
            expiresIn: 86400, // expires in 24 hours
          });

        delete registerUser.dataValues.hashPassword;

        return res.status(201).json({
          data: [registerUser.dataValues],
          token,
        });
      }
    } catch (error) {
      console.log(error);
    }
    return res.status(500).json({
      error: 'Oups, something went wrong!',
    });
  }

  // social network sign up
  static async socialAuth(req, res) {
    const { user } = req;
    let foundUser = await User.findOne({ where: { email: user.email } });
    console.log(user);
    if (!foundUser) {
      foundUser = User.create(user);
    }

    return res.json({ status: 200, user: foundUser.get() });
  }
}

export default usersController;
