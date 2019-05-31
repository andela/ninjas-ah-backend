import db from '../../models';
import updateArticle from '../articles/update';

/**
 * @param {int} userId
 * @param {string} articleSlug
 * @param {string} favoritesCount
 * @returns {int} returns 1 if the favorited article was removed otherwise 0
 */
export default async (userId, articleSlug, favoritesCount) => {
  try {
    const removeFavorite = await db.FavoriteArticle.destroy({
      where: { userId, articleSlug },
      logging: false
    });
    if (removeFavorite) {
      await updateArticle({ favoritesCount: favoritesCount - 1 }, articleSlug);
    }
    return removeFavorite;
  } catch (error) {
    return {
      errors: error
    };
  }
};
