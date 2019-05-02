/* eslint-disable require-jsdoc */
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
class Helper {
  static hashPassword(password) {
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    return hashedPassword;
  }

  static comparePassword(passwordHash, password) {
    const comparedPassword = bcrypt.compareSync(password, passwordHash);
    return comparedPassword;
  }
}

export default Helper;
