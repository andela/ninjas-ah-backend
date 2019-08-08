import db from '../../models';
import * as filters from '../../helpers/searchArticleFilters';

/**
 * Get specific article
 * @param {object} limit limit for query
 * @param {object} offset offset for query
 * @param {object} condition contains author, tag and keyword to filter query
 * @returns {object} Object representing the response returned
 */
export default async (limit, offset, condition = {}) => {
  const where = filters.filterQueryBuilder(condition);
  let response = [];
  response = await db.Article.findAll({
    limit,
    offset,
    where,
    order: [['id', 'DESC']],
    logging: false,
    include: [
      {
        model: db.User,
        as: 'author',
        attributes: ['firstName', 'lastName', 'username', 'bio', 'image']
      }
    ]
  });
  return response;
};
