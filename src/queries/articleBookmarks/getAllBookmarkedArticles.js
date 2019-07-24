import db from '../../models';

/**
 * @param {int} bookmarkedBy
 * @returns {array} an array containing the list of bookmarked articles
 */
export default async (bookmarkedBy) => {
  try {
    const bookmarkedArticles = bookmarkedBy
      ? await db.ArticleBookmark.findAll({
        where: { userId: bookmarkedBy },
        logging: false,
        include: [
          {
            model: db.Article,
            as: 'article',
            attributes: ['id', 'title', 'description', 'coverUrl', 'readTime']
          }
        ]
      })
      : null;

    return bookmarkedArticles || [];
  } catch (error) {
    return {
      errors: error
    };
  }
};
