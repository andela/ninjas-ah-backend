import db from '../../models';

/**
 * Get user stats
 * @param {object} condition condition for query
 * @returns {object} Object representing the response returned
 */
export default async (condition = {}) => db.ReadingStat.findAndCountAll({
  where: condition,
  logging: false,
  include: [
    {
      model: db.User,
      as: 'user',
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  ],
  order: [['createdAt', 'DESC']]
});
