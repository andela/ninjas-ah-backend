import db from '../../models';

/**
 * @param {object} condition
 * @returns {object} an object containing the information of the user or null
 */
export default async (condition = {}) => {
  try {
    const user = await db.User.findAll({
      limit: 1,
      where: condition,
      logging: false
    });

    return user;
  } catch (error) {
    return {
      errors: error
    };
  }
};
