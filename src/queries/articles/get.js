import Sequelize from 'sequelize';
import db from '../../models';

const { Op } = Sequelize;
/**
 * Get specific article
 * @param {object} condition condition for query
 * @returns {object} Object representing the response returned
 */
export default async (condition = {}) => db.Article.findOne({
  where: { ...condition, status: { [Op.ne]: 'deleted' } },
  logging: false,
  include: [
    {
      model: db.User,
      as: 'author',
      attributes: ['username', 'firstName', 'lastName', 'bio', 'image']
    }
  ]
});
