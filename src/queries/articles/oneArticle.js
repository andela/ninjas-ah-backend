import db from '../../models';

/**
 * class that can be used to get one article
 */
export default class ArticleQueries {
  /**
   * @param {object} condition
   * @returns {object} object that contain to information to get one article.
   */
  static async getOne(condition = {}) {
    const article = await db.Article.findOne({
      where: condition
    });
    return article;
  }
}
