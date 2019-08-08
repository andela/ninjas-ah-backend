import db from '../../models';

/**
 * @param {int} favoritedBy
 * @param {string} articleSlug
 * @returns {array} an array containing the list of favorited articles
 */
export default async (favoritedBy, articleSlug) => {
  try {
    const condition = {
      userId: favoritedBy,
      articleSlug
    };
    Object.keys(condition).forEach(key => condition[key] || delete condition[key]);

    return Object.keys(condition).length
      ? await db.FavoriteArticle.findAll({
        where: condition,
        logging: false,
        include: [
          {
            model: db.User,
            as: 'favoritedBy',
            attributes: ['id', 'firstName', 'lastName', 'username', 'email', 'image']
          }
        ]
      })
      : [];
  } catch (error) {
    return {
      errors: error
    };
  }
};
