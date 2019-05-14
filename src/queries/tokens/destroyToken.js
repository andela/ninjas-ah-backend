import db from '../../models';

/**
 * @param {int} userId the id of the user
 * @returns {int} return the number of affected rows
 */
export default async (userId = 0) => {
  try {
    const deletedToken = await db.Token.destroy({ where: { userId }, logging: false });
    return deletedToken;
  } catch (error) {
    return {
      errors: error.message
    };
  }
};
