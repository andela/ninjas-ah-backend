import { User } from '../../models/queries';

/**
 * @param {object} input
 * @returns {boolean} return true if the user exists or false if not
 */
export default async (input) => {
  const findUser = await User.find(input);

  if (Object.keys(findUser).length > 0) {
    return true;
  }

  return false;
};
