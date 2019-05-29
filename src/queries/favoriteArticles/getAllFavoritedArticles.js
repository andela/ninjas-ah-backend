import db from '../../models';

/**
 * @param {int} favoritedBy
 * @returns {array} an array containing the list of favorited articles
 */
export default async (favoritedBy) => {
  try {
    const favoritedArticles = favoritedBy
      ? await db.FavoriteArticle.findAll({ where: { userId: favoritedBy }, logging: false })
      : null;

    return favoritedArticles || [];
  } catch (error) {
    return {
      errors: error
    };
  }
};
