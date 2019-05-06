import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @param {object} payload the payload to encode the token
 * @param {object} expiresIn the expiration time of the token
 * @returns {string} the generated token
 */
export default (payload = {}, expiresIn = { expiresIn: '1d' }) => {
  try {
    const token = Object.keys(payload).length
      ? jwt.sign(payload, process.env.SECRET_KEY, expiresIn)
      : '';
    return token;
  } catch (error) {
    return null;
  }
};
