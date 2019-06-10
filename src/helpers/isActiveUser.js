import { User } from '../queries';

/**
 * @param {object} input
 * @returns {boolean} return true if the user is active or false if not
 */
export default async (input = {}) => {
  const checkUser = await User.findOne(input);
  if (!checkUser.errors && Object.keys(checkUser).length > 0) {
    if (checkUser.isActive) {
      return true;
    }
  }
};
