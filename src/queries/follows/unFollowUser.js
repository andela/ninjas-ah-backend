import db from '../../models';

/**
 * @param {object} input user input, userId and user to unfollow
 * @returns {object} an object containing the information of the user or null
 */
export default async (input = {}) => {
  try {
    const followUser = await db.Follows.destroy({ where: input }, { logging: false });
    return followUser;
  } catch (error) {
    return {
      errors: error.message
    };
  }
};
