import db from '../../models';

/**
 * @param {int} userId
 * @param {string} token
 * @returns {object} an object containing the token and the user ID or null
 */
export default async (userId, token) => {
  try {
    const findToken = userId
      ? await db.Token.findOne({
        where: { userId, token },
        logging: false
      })
      : null;

    return findToken ? findToken.dataValues : {};
  } catch (error) {
    return {
      errors: error
    };
  }
};
