import db from '../../models';
import * as filters from '../../helpers/searchArticleFilters';

/**
 * Get specific article ratings
 * @param {object} limit limit for query
 * @param {object} offset offset for query
 * @param {object} condition contains author, tag and keyword to filter query
 * @returns {object} Object representing the response returned
 */
export default async (limit, offset, { keyword, author, tag }) => {
  const where = filters.filterQueryBuilder({ keyword, author, tag });
  const paginate = { limit, offset };
  let response = [];
  response = await db.Article.findAll({
    paginate,
    where,
    order: [['rating', 'DESC']],
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
