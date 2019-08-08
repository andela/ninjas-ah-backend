import db from '../../models';

/**
 * Get article rating
 * @param {object} where condition for query
 * @returns {object} Object representing the response returned
 */
export default async (where = {}) => db.Rating.findAll({
  where,
  logging: false,
  attributes: ['id', 'rating', 'createdAt'],
  include: [
    {
      model: db.User,
      as: 'author',
      attributes: ['username', 'firstName', 'lastName', 'bio', 'image', 'createdAt']
    }
  ]
});
