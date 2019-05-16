import db from '../../models';

/**
 * @param {string} token the new token
 * @param {int} userId the id of the user
 * @returns {object} return the updated token when successfuly updated
 */
export default async (token = '', userId = 0) => {
  try {
    const updatedToken = await db.Token.update(
      { token },
      { where: { userId }, logging: false, returning: true }
    );
    return updatedToken[0] ? updatedToken[1][0].dataValues : {};
  } catch (error) {
    return {
      errors: error.message
    };
  }
};
