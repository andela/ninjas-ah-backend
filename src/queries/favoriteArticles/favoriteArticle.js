import db from '../../models';
import updateArticle from '../articles/update';
/**
 * @param {int} userId
 * @param {string} articleSlug
 * @param {string} favoritesCount
 * @returns {object} returns the user Id and the slug of the article in a object
 */
export default async (userId, articleSlug, favoritesCount) => {
  try {
    const favorite = (await db.FavoriteArticle.create(
      { userId, articleSlug },
      { logging: false }
    )).get();
    if (Object.keys(favorite).length) {
      await updateArticle({ favoritesCount: favoritesCount + 1 }, articleSlug);
    }
    return favorite;
  } catch (error) {
    return {
      errors: error
    };
  }
};
