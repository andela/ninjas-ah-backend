import db from '../../models';

/**
 * class that can be used to get one article
 */
export default class ArticleQueries {
  /**
   * Get one Article
   * @param {object} condition will fetch one article
   * @returns {object} will return an object.
   */
  static async getOne(condition = {}) {
    const article = await db.Article.findOne({
      where: condition
    });
    return article;
  }
}
