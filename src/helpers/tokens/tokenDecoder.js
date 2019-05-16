import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @param {string} token the token to decode
 * @returns {object} the decoded token
 */
export default (token = '') => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return {
      errors: error
    };
  }
};
