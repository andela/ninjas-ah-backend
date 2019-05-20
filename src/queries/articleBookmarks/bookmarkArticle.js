import db from '../../models';

/**
 * @param {int} userId
 * @param {string} articleSlug
 * @returns {object} returns the user Id and the slug of the article in a object
 */
export default async (userId, articleSlug) => {
  try {
    const bookmarkedArticle = await db.ArticleBookmark.create(
      { userId, articleSlug },
      { logging: false }
    );

    return bookmarkedArticle.get();
  } catch (error) {
    return {
      errors: error
    };
  }
};
