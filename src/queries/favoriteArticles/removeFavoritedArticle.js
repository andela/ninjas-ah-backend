import db from '../../models';

/**
 * @param {int} userId
 * @param {string} articleSlug
 * @returns {int} returns 1 if the favorited article was removed otherwise 0
 */
export default async (userId, articleSlug) => {
  try {
    return await db.FavoriteArticle.destroy({
      where: { userId, articleSlug },
      logging: false
    });
  } catch (error) {
    return {
      errors: error
    };
  }
};
