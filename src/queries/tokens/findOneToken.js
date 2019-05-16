import db from '../../models';

/**
 * @param {int} userId
 * @returns {object} an object containing the token and the user ID or null
 */
export default async (userId = 0) => {
  try {
    const token = userId
      ? await db.Token.findOne({
        where: { userId },
        logging: false
      })
      : null;

    return token ? token.dataValues : {};
  } catch (error) {
    return {
      errors: error
    };
  }
};
