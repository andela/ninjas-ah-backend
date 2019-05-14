import db from '../../models';

/**
 * @param {object} condition
 * @returns {object} an object containing the information of the user or null
 */
export default async (condition = {}) => {
  try {
    const user = Object.keys(condition).length
      ? await db.User.findOne({
        where: condition,
        logging: false
      })
      : null;

    return user ? user.dataValues : {};
  } catch (error) {
    return {
      errors: error
    };
  }
};
