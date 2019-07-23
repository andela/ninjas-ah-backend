import db from '../../models';

/**
 * Get specific article
 * @param {object} status limit for query
 * @param {object} offset offset for query
 * @param {object} condition contains author, tag and keyword to filter query
 * @returns {object} Object representing the response returned
 */
export default async (status) => {
  let response = [];
  response = await db.Article.findAll({
    where: { status },
    logging: false,
    attributes: ['id']
  });
  return response;
};
