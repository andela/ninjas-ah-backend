import db from '../../models';

/**
 * @param {int} userId
 * @param {string} articleSlug
 * @returns {int} returns 1 if the bookmark was removed otherwise 0
 */
export default async (userId, articleSlug) => {
  try {
    const removedBookmark = userId && articleSlug
      ? await db.ArticleBookmark.destroy({ where: { userId, articleSlug }, logging: false })
      : null;

    return removedBookmark;
  } catch (error) {
    return {
      errors: error
    };
  }
};
