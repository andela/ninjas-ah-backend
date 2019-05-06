import db from '../../models';

/**
 * @param {object} user
 * @returns {object} an object containing the information of the user or null
 */
export default async (user = {}) => {
  try {
    const newUser = await db.User.create(user, { logging: false });

    return newUser.dataValues;
  } catch (error) {
    return {
      errors: error
    };
  }
};
