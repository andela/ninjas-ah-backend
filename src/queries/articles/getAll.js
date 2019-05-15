import db from '../../models';
import * as searchArticleFilters from '../../helpers/searchArticleFilters';

/**
 * Get specific article
 * @param {object} limit limit for query
 * @param {object} offset offset for query
 * @param {object} keyword search keyword
 * @param {object} author search by author
 * @param {object} tag seach by tag
 * @param {object} condition condition for query
 * @returns {object} Object representing the response returned
 */
export default async (limit, offset, keyword, author, tag) => {
  let where = {};
  if (keyword && !author && !tag) where = searchArticleFilters.keyword(keyword);
  if (!keyword && author && !tag) where = searchArticleFilters.author(author);
  if (!keyword && !author && tag) where = searchArticleFilters.tag(tag);
  if (keyword && author && !tag) where = searchArticleFilters.keywordAndAuthor(keyword, author);
  if (keyword && !author && tag) where = searchArticleFilters.keywordAndTag(keyword, tag);
  if (!keyword && author && tag) where = searchArticleFilters.authorAndtag(author, tag);
  if (!keyword && !author && !tag) where = { status: { [db.Op.ne]: 'deleted' } };

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
        attributes: ['username', 'bio', 'image']
      }
    ]
  });
  return response;
};
