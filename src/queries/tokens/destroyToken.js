import db from '../../models';

/**
 * @param {int} userId
 * @returns {int} return the number of affected rows
 */
export default async (userId) => {
  try {
    const { Op } = db.Sequelize;
    const deletedToken = await db.Token.destroy({
      where: {
        userId,
        createdAt: { [Op.lte]: new Date(new Date() - 86400000) }
      },
      logging: false
    });
    return deletedToken;
  } catch (error) {
    return {
      errors: error
    };
  }
};
