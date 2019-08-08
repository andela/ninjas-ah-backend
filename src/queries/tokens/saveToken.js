import db from '../../models';

/**
 * @param {string} token
 * @param {int} userId
 * @returns {object} return the saved token
 */
export default async (token = '', userId = 0) => {
  try {
    const newToken = await db.Token.create({ token, userId }, { logging: false });

    return newToken.dataValues;
  } catch (error) {
    return {
      errors: error
    };
  }
};
