import Sequelize from 'sequelize';
import db from '../../models';

const { Op } = Sequelize;
/**
 * Get specific article
 * @param {object} limit limit for query
 * @param {object} offset offset for query
 * @param {object} condition condition for query
 * @returns {object} Object representing the response returned
 */
export default async (limit = 20, offset = 0) => {
  const condition = { status: { [Op.ne]: 'deleted' } };
  let response = [];
  response = await db.Article.findAll({
    limit,
    offset,
    where: condition,
    logging: false,
    include: [
      {
        model: db.User,
        as: 'author',
        attributes: ['username', 'bio', 'image']
      }
    ]
  });
  return response;
};
